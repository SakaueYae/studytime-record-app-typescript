export class Record {
  constructor(public id: string, public title: string, public time: number) {}
}

export class FormRecord implements Omit<Record, "id"> {
  constructor(public title: string, public time: number) {}
}
