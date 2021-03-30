class OrganizerTask {
  id: string;
  creationDate: Number;
  title: string;
  description: string;
  status: string;

  constructor(id, creationDate, title, description, status) {
    this.id = id;
    this.creationDate = creationDate;
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

export { OrganizerTask };
