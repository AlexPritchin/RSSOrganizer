import XMLParser from '@kazukinagata/react-xml-parser';
import { format } from 'date-fns';
import { decode } from 'html-entities';

import { RSSArticle } from '../models/RSSArticle';

import { dateFormatMask } from '../constants/DateConstants';

const parseXMLToArrayOfObjects = (XMLString: string): RSSArticle[] => {
  const XMLParsedDocument = new XMLParser().parseFromString(XMLString);
  if (!XMLParsedDocument) {
    return [];
  }
  const XMLParsedRSSItems = XMLParser.getElementsByTagName(XMLParsedDocument, 'item');

  const RSSArticleItems: RSSArticle[] = XMLParsedRSSItems.map(XMLParsedRSSItem => {
    const articleGuid = XMLParser.getElementsByTagName(XMLParsedRSSItem, 'guid')[0].value;
    const articlePubDate = XMLParser.getElementsByTagName(XMLParsedRSSItem, 'pubDate')[0].value;
    const articlePubDateDateObj = new Date(articlePubDate);
    const articlePubDateFormatted = format(
      articlePubDateDateObj,
      dateFormatMask
    );
    const articleTtl = XMLParser.getElementsByTagName(XMLParsedRSSItem, 'title')[0].value;
    const articleTitle = decode(articleTtl, { level: 'xml' });
    const articleDescription = XMLParser.getElementsByTagName(XMLParsedRSSItem, 'description')[0].value;
    const articleCreatorArray = XMLParser.getElementsByTagName(XMLParsedRSSItem, 'dc:creator');
    let articleCreator = '';
    if (articleCreatorArray.length !== 0) {
      articleCreator = articleCreatorArray[0].value;
    }
    const articleLink = XMLParser.getElementsByTagName(XMLParsedRSSItem, 'link')[0].value;
    const articleImageLinkElement = XMLParser.getElementsByTagName(XMLParsedRSSItem, 'media:content');
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
    (itemA: RSSArticle, itemB: RSSArticle) => {
      return Date.parse(itemB.publicationDate) > Date.parse(itemA.publicationDate) ? 1 : -1
    }
  );
};

export { parseXMLToArrayOfObjects };
