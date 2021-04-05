class RSSArticle {
  id: string;
  publicationDate: string;
  title: string;
  description: string;
  creator: string;
  link: string;
  imageLink: string;

  constructor(
    id: string,
    publicationDate: string,
    title: string,
    description: string,
    creator: string,
    link: string,
    imageLink: string
  ) {
    this.id = id;
    this.publicationDate = publicationDate;
    this.title = title;
    this.description = description;
    this.creator = creator;
    this.link = link;
    this.imageLink = imageLink;
  }
}

export { RSSArticle };
