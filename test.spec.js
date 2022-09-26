const requests = [];
const responses = [];
const zip = '12345';
const feelings = 'Great';

beforeAll(async() => {
    await page.goto(`http://localhost:3000`);
    await page.setRequestInterception(true);
    // await page.setViewport({width: 499, height: 800});
    page.on('request', req => {
        requests.push({url: req.url(), method: req.method(), body: req.postData()});
        console.log('Request:', req.url());
        req.continue();
    });
    page.on('response', async resp => {
        responses.push(await resp.json());
        console.log('Response:', await resp.json())
    });
    await page.type('#zip', zip);
    await page.type('#feelings', feelings);
    await page.click('#generate');
    await page.waitForTimeout(1000);
});

afterAll(async() => {
});

describe('weather journal', () => {
    it('should have 3 requests', () => expect(requests.length).toBe(3));
    it('1st request should be /openweatherapi', () => expect(requests[0].url).toMatch(`/openweatherapi?zip=${zip}`));
    it('2nd request should be /post', () => expect(requests[1].url).toMatch('/post'));
    it('3rd request should be /get', () => expect(requests[2].url).toMatch('/get'));
    it('postBody of 2nd request should be equal to response of 3rd request', async () => {
        const postBody = JSON.parse(requests[1].body);
        const postBodyValues = Object.values(postBody);
        expect(postBodyValues.find(v => v === feelings)).toBeTruthy();
        expect(postBody).toEqual(responses[2]);
    });
});
