class RSSArticle {
  id: string;
  publicationDate: Number;
  title: string;
  description: string;
  creator: string;
  link: string;
  imageLink: string;
  
    constructor(id, publicationDate, title, description, creator, link, imageLink) {
        this.id = id;
        this.publicationDate = publicationDate;
        this.title = title;
        this.description = description;
        this.creator = creator;
        this.link = link;
        this.imageLink = imageLink;
    }
};

export { RSSArticle };