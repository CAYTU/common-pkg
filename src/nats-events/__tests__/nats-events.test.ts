import { JSONCodec } from "nats";
import { Publisher } from "../publisher";
import { Listener } from "../listener";
import { Subjects } from "../subjects";
import { EVENTS_STREAM_NAME, connectAndSetup } from "../setup";

const codec = JSONCodec();

interface TaskCreatedEvent {
  subject: Subjects.TaskCreated;
  data: { id: string; title: string };
}

class TaskCreatedPublisher extends Publisher<TaskCreatedEvent> {
  subject: Subjects.TaskCreated = Subjects.TaskCreated;
}

class TaskCreatedListener extends Listener<TaskCreatedEvent> {
  subject: Subjects.TaskCreated = Subjects.TaskCreated;
  queueGroupName = "tasks-service";
  onMessage = jest.fn();
}

/** Fake NatsConnection that records JetStream interactions. */
function makeFakeNc() {
  const publish = jest.fn().mockResolvedValue({ seq: 1, stream: "EVENTS" });
  const consumerInfo = jest.fn();
  const consumerAdd = jest.fn().mockResolvedValue({});
  const consume = jest.fn().mockResolvedValue({
    [Symbol.asyncIterator]: async function* () {
      // Yield one fake message so the listener loop ticks once.
      yield {
        data: codec.encode({ id: "t1", title: "hello" }),
        ack: jest.fn(),
        nak: jest.fn(),
        info: { stream: EVENTS_STREAM_NAME },
      };
    },
  });
  const consumerGet = jest.fn().mockResolvedValue({ consume });

  const js = { publish };
  const jsm = {
    consumers: { info: consumerInfo, add: consumerAdd },
  };
  const consumers = { get: consumerGet };

  const nc = {
    jetstream: jest.fn(() => ({ ...js, consumers })),
    jetstreamManager: jest.fn(async () => jsm),
  };

  return { nc, publish, consumerInfo, consumerAdd, consumerGet, consume };
}

describe("Publisher", () => {
  it("publishes JSON-encoded data on its subject", async () => {
    const { nc, publish } = makeFakeNc();
    const p = new TaskCreatedPublisher(nc as never);

    await p.publish({ id: "t1", title: "hello" });

    expect(publish).toHaveBeenCalledTimes(1);
    const [subject, payload] = publish.mock.calls[0];
    expect(subject).toBe("task:created");
    expect(JSON.parse(Buffer.from(payload).toString())).toEqual({
      id: "t1",
      title: "hello",
    });
  });
});

describe("Listener", () => {
  it("creates a durable consumer when one doesn't exist", async () => {
    const { nc, consumerInfo, consumerAdd } = makeFakeNc();
    consumerInfo.mockRejectedValueOnce(new Error("not found"));

    const l = new TaskCreatedListener(nc as never);
    await l.listen();

    expect(consumerAdd).toHaveBeenCalledTimes(1);
    const [stream, cfg] = consumerAdd.mock.calls[0];
    expect(stream).toBe(EVENTS_STREAM_NAME);
    expect(cfg).toMatchObject({
      durable_name: "tasks-service-task-created",
      filter_subject: "task:created",
      ack_policy: "explicit",
      deliver_policy: "all",
    });
  });

  it("reuses an existing consumer (idempotent)", async () => {
    const { nc, consumerInfo, consumerAdd } = makeFakeNc();
    consumerInfo.mockResolvedValueOnce({ name: "tasks-service--task-created" });

    const l = new TaskCreatedListener(nc as never);
    await l.listen();

    expect(consumerAdd).not.toHaveBeenCalled();
  });

  it("parses JSON messages and invokes onMessage", async () => {
    const { nc } = makeFakeNc();
    const l = new TaskCreatedListener(nc as never);
    await l.listen();

    // The fake consume() yields one message synchronously when iterated; the
    // listener spawns its consumption loop, so give the microtask queue a tick.
    await new Promise((r) => setImmediate(r));

    expect(l.onMessage).toHaveBeenCalledWith(
      { id: "t1", title: "hello" },
      expect.any(Object),
    );
  });

  it("sanitises subject delimiters in durable consumer names", async () => {
    class NestedListener extends Listener<{
      subject: Subjects.OrganizationMemberRoleUpdated;
      data: { id: string };
    }> {
      subject: Subjects.OrganizationMemberRoleUpdated =
        Subjects.OrganizationMemberRoleUpdated;
      queueGroupName = "auth-service";
      onMessage = jest.fn();
    }

    const { nc, consumerInfo, consumerAdd } = makeFakeNc();
    consumerInfo.mockRejectedValueOnce(new Error("not found"));

    await new NestedListener(nc as never).listen();

    const [, cfg] = consumerAdd.mock.calls[0];
    expect(cfg.durable_name).not.toContain(":");
    expect(cfg.durable_name).toMatch(/^[a-zA-Z0-9_-]+$/);
  });
});

describe("connectAndSetup", () => {
  it("is exported with the expected shape", () => {
    expect(typeof connectAndSetup).toBe("function");
    expect(EVENTS_STREAM_NAME).toBe("EVENTS");
  });
});
