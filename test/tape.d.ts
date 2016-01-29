declare module "tape" {
  interface Test {
    skip: any
    onFinish: any
    plan: any
    end: any
    fail: any
    pass: any
    timeoutAfter: any
    ok: any
    notOk: any
    error: any
    equal: any
    notEqual: any
    deepEqual: any
    notDeepEqual: any
    deepLooseEqual: any
    notDeepLooseEqual: any
    throws: any
    doesNotThrow: any
    test: any
    comment: any
    htest: any
    only: any
  }

  var a: (x: string, b: (x: Test) => void) => void
  export = a
}

declare var require: any
