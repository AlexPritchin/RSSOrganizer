import { getRSSXML } from '../../web/RSSWebService';

import { parseXMLToArrayOfObjects } from '../../../utils/RSSXmlParser';

const getRSSArticles = async () => {
    const RSSXMLString = await getRSSXML();
    if (RSSXMLString === '') {
      return [];
    }
    return parseXMLToArrayOfObjects(RSSXMLString);
};

export { getRSSArticles };
