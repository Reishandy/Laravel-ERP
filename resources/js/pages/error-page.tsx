import React from 'react';
import AuthLayout from '@/layouts/auth-layout';

interface ErrorPageProps {
    status: number;
}

const titles: Record<number, string> = {
    400: '400: Bad Request',
    401: '401: Unauthorized',
    402: '402: Payment Required',
    403: '403: Forbidden',
    404: '404: Not Found',
    405: '405: Method Not Allowed',
    406: '406: Not Acceptable',
    407: '407: Proxy Authentication Required',
    408: '408: Request Timeout',
    409: '409: Conflict',
    410: '410: Gone',
    411: '411: Length Required',
    412: '412: Precondition Failed',
    413: '413: Payload Too Large',
    414: '414: URI Too Long',
    415: '415: Unsupported Media Type',
    416: '416: Range Not Satisfiable',
    417: '417: Expectation Failed',
    418: "418: I'm a teapot",
    421: '421: Misdirected Request',
    422: '422: Unprocessable Entity',
    423: '423: Locked',
    424: '424: Failed Dependency',
    425: '425: Too Early',
    426: '426: Upgrade Required',
    428: '428: Precondition Required',
    429: '429: Too Many Requests',
    431: '431: Request Header Fields Too Large',
    451: '451: Unavailable For Legal Reasons',
    419: '419: Page Expired',

    500: '500: Internal Server Error',
    501: '501: Not Implemented',
    502: '502: Bad Gateway',
    503: '503: Service Unavailable',
    504: '504: Gateway Timeout',
    505: '505: HTTP Version Not Supported',
    506: '506: Variant Also Negotiates',
    507: '507: Insufficient Storage',
    508: '508: Loop Detected',
    510: '510: Not Extended',
    511: '511: Network Authentication Required',
};

const descriptions: Record<number, string> = {
    400: 'The request could not be understood by the server.',
    401: 'You are not authorized to access this page.',
    402: 'Payment is required to access this resource.',
    403: 'Sorry, you are forbidden from accessing this page.',
    404: 'Sorry, the page you are looking for could not be found.',
    405: 'The method is not allowed for the requested URL.',
    406: 'The requested resource is not acceptable.',
    407: 'Proxy authentication is required.',
    408: 'The server timed out waiting for the request.',
    409: 'There was a conflict with the current state of the resource.',
    410: 'The requested resource is no longer available.',
    411: 'Content-Length header is required.',
    412: 'Precondition given in the request failed.',
    413: 'The request is larger than the server is willing or able to process.',
    414: 'The URI provided was too long for the server to process.',
    415: 'The request entity has a media type which the server or resource does not support.',
    416: 'The client has asked for a portion of the file, but the server cannot supply that portion.',
    417: 'The server cannot meet the requirements of the Expect request-header field.',
    418: "I'm a teapot. The requested entity body is short and stout.",
    421: 'The request was directed at a server that is not able to produce a response.',
    422: 'The request was well-formed but was unable to be followed due to semantic errors.',
    423: 'The resource that is being accessed is locked.',
    424: 'The request failed due to failure of a previous request.',
    425: 'The server is unwilling to risk processing a request that might be replayed.',
    426: 'Upgrade to a different protocol is required.',
    428: 'The origin server requires the request to be conditional.',
    429: 'You have sent too many requests in a given amount of time.',
    431: 'The server is unwilling to process the request because its header fields are too large.',
    451: 'The resource is unavailable for legal reasons.',
    419: 'The page has expired due to inactivity. Please refresh and try again.',

    500: 'Whoops, something went wrong on our servers.',
    501: 'The server does not support the functionality required to fulfill the request.',
    502: 'The server received an invalid response from the upstream server.',
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    504: 'The server did not receive a timely response from the upstream server.',
    505: 'The server does not support the HTTP protocol version used in the request.',
    506: 'The server has an internal configuration error.',
    507: 'The server is unable to store the representation needed to complete the request.',
    508: 'The server detected an infinite loop while processing the request.',
    510: 'Further extensions to the request are required for the server to fulfill it.',
    511: 'Network authentication is required to access this resource.',
};

export default function ErrorPage({ status }: ErrorPageProps) {
    const title = titles[status] ?? `${status}: Error`;
    const description = descriptions[status] ?? 'An unexpected error has occurred.';

    return (
        <div>
            <AuthLayout title={title} description={description} children="" />
        </div>
    );
}
