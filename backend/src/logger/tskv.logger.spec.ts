import { TSKVLogger } from './tskv.logger';

describe('TSKVLogger tests', () => {
  let log;
  const tskvLogger = new TSKVLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    log.mockReset();
  });

  it('.log() should be log correct format', () => {
    tskvLogger.warn('hello', { a: 'b', c: 1 });
    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith(
      'level=warn\tmessage=hello\toptional=[[{"a":"b","c":1}]]',
    );
  });
});
