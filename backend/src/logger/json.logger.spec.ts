import { JsonLogger } from './json.logger';

describe('JsonLogger tests', () => {
  let log;
  const jsonLogger = new JsonLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    log.mockReset();
  });

  it('.log() should be log correct format', () => {
    jsonLogger.warn('hello', { a: 'b', c: 1 });
    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith(
      '{"level":"warn","message":"hello","optionalParams":[[{"a":"b","c":1}]]}',
    );
  });
});
