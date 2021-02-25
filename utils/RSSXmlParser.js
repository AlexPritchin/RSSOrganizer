import XMLParser from 'react-xml-parser';
import { format } from 'date-fns';
import { decode } from 'html-entities';

import { RSSArticle } from '../models/RSSArticle';

const parseXMLToArrayOfObjects = XMLString => {
  const XMLParsedDocument = new XMLParser().parseFromString(XMLString);
  const XMLParsedRSSItems = XMLParsedDocument.getElementsByTagName('item');

  const RSSArticleItems = XMLParsedRSSItems.map(XMLParsedRSSItem => {
    const articleGuid = XMLParsedRSSItem.getElementsByTagName('guid')[0].value;
    const articlePubDate = XMLParsedRSSItem.getElementsByTagName('pubDate')[0].value;
    const articlePubDateDateObj = new Date(articlePubDate);
    const articlePubDateFormatted = format(
      articlePubDateDateObj,
      'E, dd MMM y HH:mm'
    );
    const articleTtl = XMLParsedRSSItem.getElementsByTagName('title')[0].value;
    const articleTitle = decode(articleTtl, { level: 'xml' });
    const articleDescription = XMLParsedRSSItem.getElementsByTagName('description')[0].value;
    const articleCreator = XMLParsedRSSItem.getElementsByTagName('dc:creator')[0].value;
    const articleLink = XMLParsedRSSItem.getElementsByTagName('link')[0].value;
    const articleImageLinkElement = XMLParsedRSSItem.getElementsByTagName('media:content');
    let articleImageLink = '';
    if (articleImageLinkElement.length !== 0) {
      articleImageLink = articleImageLinkElement[0].attributes.url;
    }
    return new RSSArticle(
      articleGuid,
      articlePubDateFormatted,
      articleTitle,
      articleDescription,
      articleCreator,
      articleLink,
      articleImageLink
    );
  });

  return RSSArticleItems.sort(
    (itemA, itemB) =>
      Date.parse(itemB.publicationDate) > Date.parse(itemA.publicationDate)
  );
};

export { parseXMLToArrayOfObjects };
