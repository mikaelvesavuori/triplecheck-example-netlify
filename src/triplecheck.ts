import { Handler } from '@netlify/functions';
import dotenv from 'dotenv';

import { TripleCheckBroker } from 'triplecheck-broker';
import { FaunaRepository } from 'triplecheck-repository-fauna';

dotenv.config();

const handler: Handler = async (event) => {
  const [request, payload] = await getRequestData(event);

  const repository = FaunaRepository();
  const { responseData, status, headers } = await TripleCheckBroker(request, payload, repository);

  const response = {
    statusCode: status,
    body: JSON.stringify(responseData),
    headers
  };

  return response;
};

export { handler };

/**
 * @description Utility function to get the data we need to run the TripleCheck broker. Expects the full AWS Lambda event object.
 */
async function getRequestData(event: any): Promise<any> {
  const { body, httpMethod, path, queryStringParameters } = event;

  const payload = body && typeof body === 'string' ? JSON.parse(body) : body;

  const search = (() => {
    let _search = '';
    if (queryStringParameters && JSON.stringify(queryStringParameters) !== '{}') {
      _search += Object.keys(queryStringParameters)[0];
      _search += Object.values(queryStringParameters)[0];
    }
    return _search;
  })();

  return [
    {
      method: httpMethod,
      pathname: path || '/',
      search
    },
    payload
  ];
}
