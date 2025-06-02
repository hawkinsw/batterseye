export abstract class Option<A> {
  public abstract isNone(): boolean;

  public map<B>(_: (a: A) => Option<B>): Option<B> {
    return new None<B>();
  }

  public orValue(or: A): A {
    return or;
  }

  public abstract toString(): string;
}

export class Some<A> extends Option<A> {
  value: A;
  public constructor(item: A) {
    super();
    this.value = item;
  }
  public override isNone(): boolean {
    return false;
  }
  public override map<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value);
  }

  public override orValue(_: A): A {
    return this.value;
  }

  public override toString(): string {
    return `${this.value}`;
  }
}

export class None<A> extends Option<A> {
  public override isNone(): boolean {
    return true;
  }

  public override toString(): string {
    return "None";
  }
}
