class RSSArticle {
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