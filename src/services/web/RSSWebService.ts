import { RSSbaseURL } from '../../constants/BaseURLs';

const getRSSXML = async () => {
    try {
        const RSSresponse = await fetch(RSSbaseURL);
        return RSSresponse.text();
    } catch (error) {
        throw error;
    }  
};

export { getRSSXML };