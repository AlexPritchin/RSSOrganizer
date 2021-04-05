class OrganizerTask {
  id: string;
  creationDate: number;
  title: string;
  description: string;
  status: string;

  constructor(
    id: string,
    creationDate: number,
    title: string,
    description: string,
    status: string
  ) {
    this.id = id;
    this.creationDate = creationDate;
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

export { OrganizerTask };
