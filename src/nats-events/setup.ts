import {
  connect,
  ConnectionOptions,
  NatsConnection,
  JetStreamClient,
  AckPolicy,
  DeliverPolicy,
  RetentionPolicy,
  StorageType,
  StreamConfig,
} from "nats";

export const EVENTS_STREAM_NAME = "EVENTS";
// `*` matches any single-token subject. Caytu's event subjects use `:` as the
// delimiter (e.g. `task:created`), which NATS treats as part of a single
// token — so `*` captures all of them. Using `>` instead would also capture
// JetStream's internal `$JS.>` control subjects and the server then requires
// no_ack mode, which we don't want.
export const EVENTS_STREAM_SUBJECTS = ["*"];

export interface CaytuNatsClients {
  nc: NatsConnection;
  js: JetStreamClient;
  close: () => Promise<void>;
}

export interface CaytuNatsConnectOptions {
  servers: string | string[];
  name: string;
  extra?: Partial<ConnectionOptions>;
  stream?: Partial<StreamConfig>;
}

/**
 * Connect to NATS and ensure the EVENTS stream exists. Idempotent.
 */
export async function connectAndSetup(
  opts: CaytuNatsConnectOptions,
): Promise<CaytuNatsClients> {
  const nc = await connect({
    servers: opts.servers,
    name: opts.name,
    reconnect: true,
    maxReconnectAttempts: -1,
    reconnectTimeWait: 2_000,
    ...(opts.extra ?? {}),
  });

  const jsm = await nc.jetstreamManager();
  const desired: Partial<StreamConfig> = {
    name: EVENTS_STREAM_NAME,
    subjects: EVENTS_STREAM_SUBJECTS,
    storage: StorageType.Memory,
    retention: RetentionPolicy.Limits,
    max_age: 24 * 60 * 60 * 1_000_000_000, // 24h in ns
    max_msgs_per_subject: 10_000,
    ...(opts.stream ?? {}),
  };
  try {
    await jsm.streams.info(EVENTS_STREAM_NAME);
    await jsm.streams.update(EVENTS_STREAM_NAME, desired);
  } catch {
    await jsm.streams.add(desired as StreamConfig);
  }

  return {
    nc,
    js: nc.jetstream(),
    close: () => nc.drain(),
  };
}

export { AckPolicy, DeliverPolicy, RetentionPolicy, StorageType };
