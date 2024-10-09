# @caytu/shared

This is the `@caytu/shared` npm package, a TypeScript library that provides common utilities and functionality for use in various Caytu projects.

## Prerequisites

Before building and publishing the package, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (for managing dependencies)
- A valid npm account and authentication to your npm registry (e.g., CodeArtifact)

## Installation

You can install this package using npm or yarn:

```sh
npm install @caytu/shared
```

or

```sh
yarn add @caytu/shared
```

## Usage

Once installed, you can import and use the functionality from `@caytu/shared` in your TypeScript projects as follows:

```typescript
import { someUtilityFunction } from "@caytu/shared";

const result = someUtilityFunction("Hello, Caytu!");

console.log(result); // Output: "Processed: Hello, Caytu!"
```

Make sure to refer to the package's documentation and source code for specific details on available functions and their usage.

## Development

If you want to contribute to the development of this package, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/CAYTU/common-pkg.git
   ```

2. Install project dependencies:

   ```sh
   yarn install
   ```

3. Build the package:

   ```sh
   yarn run build
   ```

4. Make any necessary changes and commit them.

5. Bump the package version according to semantic versioning:

   ```sh
   npm version patch
   ```

   This will increment the patch version. You can use `minor` or `major` instead of `patch` based on the type of changes.

6. Publish the package to CodeArtifact:

   ```sh
   npm publish
   ```

**Please ensure that you have the necessary credentials and permissions to publish to your CodeArtifact repository.**

## Versioning

This package follows semantic versioning. When making changes, please update the package version accordingly.

- `patch` version for backwards-compatible bug fixes.
- `minor` version for new, backwards-compatible features.
- `major` version for breaking changes.

## License

This package is for use in Caytu projects only. It is not licensed for use in any other projects.
