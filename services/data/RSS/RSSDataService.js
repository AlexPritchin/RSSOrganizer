import { getRSSXML } from '../../web/RSSWebService';
import { parseXMLToArrayOfObjects } from '../../../utils/RSSXmlParser';

const getRSSArticles = async () => {
  try {
    const RSSXMLString = await getRSSXML();
    if (RSSXMLString === '') {
      return [];
    }
    return parseXMLToArrayOfObjects(RSSXMLString);
  } catch (error) {
    throw error;
  }
};

export { getRSSArticles };
