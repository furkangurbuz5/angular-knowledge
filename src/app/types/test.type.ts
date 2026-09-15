export interface Test {
  readonly name: string;
}

export function createTestFrom(name: string): Test {
  return {
    name: name,
  };
}

export function makeTestValidatable<T extends Test>(obj: T): T & { validate: () => boolean } {
  return {
    ...obj,
    validate: () => validateTest(obj),
  };
}

export function makeTestPrintable<T extends Test>(obj: T): T & { print: () => void } {
  return {
    ...obj,
    print: () => console.log(`[${JSON.stringify(obj)}]`),
  };
}

function validateTest(test: Test): boolean {
  return !!test.name;
}

const basicTest = createTestFrom('Furkan!');
const validTest = makeTestValidatable(basicTest);
const printableValidTest = makeTestPrintable(validTest);
