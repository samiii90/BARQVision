export type DiagnosticsEndpoint = {
  url: string;
  protocol: 'HTTP' | 'RTSP' | 'UNKNOWN';
};

export type DiagnosticsResult = {
  url: string;
  protocol: 'HTTP' | 'RTSP' | 'UNKNOWN';
  status: number | null;
  statusText: string;
  headers: Record<string, string>;
  contentType: string | null;
  contentLength: string | null;
  first200: string | null;
  looksLikeMJPEG: boolean;
  looksLikeJPEG: boolean;
  looksLikeHTML: boolean;
  looksLikeH264: boolean;
  looksLikeProprietary: boolean;
  error: string | null;
  unsupported: boolean;
};

const HTTP_ENDPOINTS = [
  'http://192.168.25.1:8080/',
  'http://192.168.25.1:8080/?action=stream',
  'http://192.168.25.1:8080/?action=snapshot',
  'http://192.168.25.1:8080/video',
  'http://192.168.25.1:8080/mjpeg',
  'http://192.168.25.1:8080/live',
  'http://192.168.25.1:8080/stream',
];

const RTSP_ENDPOINTS = [
  'rtsp://192.168.25.1/live',
  'rtsp://192.168.25.1:554/live',
  'rtsp://192.168.25.1:8554/live',
];

const isTextContent = (contentType: string | null) => {
  return !!contentType && /^(text\/|application\/(json|xml|javascript|javascript|ecmascript)|image\/svg\+xml)/i.test(contentType);
};

const normalizeHeaderKey = (key: string) => key.toLowerCase();

const buildResult = (url: string): DiagnosticsResult => {
  const protocol = url.startsWith('http://') || url.startsWith('https://')
    ? 'HTTP'
    : url.startsWith('rtsp://')
    ? 'RTSP'
    : 'UNKNOWN';

  return {
    url,
    protocol,
    status: null,
    statusText: '',
    headers: {},
    contentType: null,
    contentLength: null,
    first200: null,
    looksLikeMJPEG: false,
    looksLikeJPEG: false,
    looksLikeHTML: false,
    looksLikeH264: false,
    looksLikeProprietary: false,
    error: null,
    unsupported: false,
  };
};

const parseHeaders = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[normalizeHeaderKey(key)] = value;
  });
  return result;
};

const detectContent = (result: DiagnosticsResult): DiagnosticsResult => {
  const contentType = result.contentType?.toLowerCase() ?? '';
  const first = result.first200?.trim() ?? '';

  const looksLikeMJPEG = /multipart\/x-mixed-replace\b/i.test(contentType) || /boundary=/.test(contentType);
  const looksLikeJPEG = /image\/jpeg/i.test(contentType) || /^\xff\xd8\xff/.test(first);
  const looksLikeHTML = /text\/html/i.test(contentType) || /^\s*<!doctype html>/i.test(first) || /^\s*<html/i.test(first);
  const looksLikeH264 = /video\/h264/i.test(contentType) || /video\//i.test(contentType) && /h264/i.test(contentType) || /^\x00\x00\x00\x01/.test(first);

  const looksLikeProprietary = !looksLikeMJPEG && !looksLikeJPEG && !looksLikeHTML && !looksLikeH264 && !!result.contentType;

  return {
    ...result,
    looksLikeMJPEG,
    looksLikeJPEG,
    looksLikeHTML,
    looksLikeH264,
    looksLikeProprietary,
  };
};

const performHttpProbe = async (url: string): Promise<DiagnosticsResult> => {
  const result = buildResult(url);

  try {
      const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    let response: Response;
    response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });

    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
      });
    }

    clearTimeout(timeoutId);

    result.status = response.status;
    result.statusText = response.statusText || '';
    result.headers = parseHeaders(response.headers);
    result.contentType = response.headers.get('content-type');
    result.contentLength = response.headers.get('content-length');

    const shouldReadBody = !!result.contentType && isTextContent(result.contentType);

    if (shouldReadBody) {
      const text = await response.text();
      result.first200 = text.slice(0, 200);
    }
  } catch (error: any) {
    result.error = error?.message || 'Unknown error';
  }

  return detectContent(result);
};

const performRtspProbe = async (url: string): Promise<DiagnosticsResult> => {
  const result = buildResult(url);
  result.error = 'RTSP protocol probe is not supported in this environment';
  result.unsupported = true;
  return result;
};

export const getDiagnosticsEndpoints = (): DiagnosticsEndpoint[] => {
  return [
    ...HTTP_ENDPOINTS.map((url) => ({ url, protocol: 'HTTP' as const })),
    ...RTSP_ENDPOINTS.map((url) => ({ url, protocol: 'RTSP' as const })),
  ];
};

export const runDiagnostics = async (): Promise<DiagnosticsResult[]> => {
  const endpoints = getDiagnosticsEndpoints();
  const results = await Promise.all(
    endpoints.map(async (endpoint) => {
      if (endpoint.protocol === 'HTTP') {
        return await performHttpProbe(endpoint.url);
      }
      return await performRtspProbe(endpoint.url);
    }),
  );

  return results;
};
