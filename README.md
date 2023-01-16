<p align="center">
  <img alt="Riot logo" width="120" src="https://uploads-ssl.webflow.com/6278dd61c2d8953dae931fbd/6278dd61c2d8956b07932038_logo-purple%25201-p-500.png" />
  <br>
  <br>
</p>

# Riot Backend-challenge

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>=18.0.0)

Install dependencies:

```bash
npm install
```

### Serve the app

```bash
npm run build
npm run start
```

### Testing

```bash
npm run test
```

Will run all tests (unit and end-to-end).

To run only unit tests:

```bash
npm run test:unit
```

To run only end-to-end tests:

```bash
npm run test:e2e
```

The end-to-end test will perform actual actions against the API and requires the server to be running.

## API

### Get the total MRR for a month

```bash
GET /mrr/total
```

#### Query parameters

| Name       | Type     | Description                                                                        |
| ---------- | -------- | ---------------------------------------------------------------------------------- |
| `month`    | `string` | **Required**. The month to get. Any of `Jan 22`, `Feb 22` or `Mar 22`.             |
| `currency` | `string` | **Required**. The currency to filter by result. Only supports `usd` at the moment. |

#### HTTP response status codes

| Status Code | Description         |
| ----------- | ------------------- |
| `200`       | OK.                 |
| `400`       | Invalid parameters. |

#### Response body

```json
{
  "total": "$443.12"
}
```

### Get the MRR evolution for a subscription between a month and the previous one (difference between the two)

```bash
GET /mrr/evolution
```

#### Query parameters

| Name             | Type     | Description                                                            |
| ---------------- | -------- | ---------------------------------------------------------------------- |
| `month`          | `string` | **Required**. The month to get. Any of `Jan 22`, `Feb 22` or `Mar 22`. |
| `subscriptionId` | `string` | **Required**. The subscription id.                                     |

#### HTTP response status codes

| Status Code | Description         |
| ----------- | ------------------- |
| `200`       | OK.                 |
| `400`       | Invalid parameters. |

#### Response body

```json
{
  "difference": "-$47.88"
}
```

## Original README

Hi there!

Since you got here, you're probably taking a part in our recruitment process for Back-end developer position, right?

We're super happy to hear that! Getting right to it — the main purpose of this test is to check out your backend and solving problems skills. We'd like to get to know your approach of solving the following problems:

- Understand specs requirements.
- Manipulate Data structure.
- Create a small API in Node.js.

Feel free to open an issue if you got any questions or suggestions! Once it's ready, send us a repository link at louis@tryriot.com.

Happy coding and cheers,

Louis, CTO @ Riot

### Exercise : MRR Compute Service

#### Problem

[MRR](<https://support.stripe.com/questions/understanding-monthly-recurring-revenue-(mrr)?>) (monthly recurring revenue) is **THE MOST IMPORTANT METRICS** for Software as a Service company (SaaS). As you may have guessed [Riot](https://tryriot.com) is a SaaS company working in Cybersecurity.

🚨 Hint: Take some time to read carefully 👆 how to compute the MRR the right way!

Your mission is:

1. To be able to compute the total MRR by month for all subscriptions in dollars ($) from this API. The API response changes its response everytime to emulate the time passing by ⏰.
2. To be able to show the MRR difference from the past month for each subscription and every month.
3. To write a small API to get those results.

```curl
curl --request GET \
  --url https://fake-subscriptions-api.fly.dev/api/subscriptions
```

#### Clarifications

- For the sake of the problem, persistence is not mandatory.
- use at least Node.js + Typescript
- Unless you have a strong preference otherwise, just use a simple webserver like Express.
- You should optimize for both readability of your code and performance.
- Tests are not mandatory but highly encouraged.
- All values will be rounded to the nearest integer.
- `items` represents the module subscribed for this subscriptions.
- `quantity` represents the number of seats for this module.
- `unit_amount` value are representing the price of the module in cents.
- `status` represents the subscription status, `active` subscription should be included in the MRR compute.

#### Example

```json
// For the following subscription the MRR is : 39.90$
{
    "id": "sub-1",
    "status": "active",
    "items" : [
        {
            "id": "sub-1-item-1",
            "module": "awareness",
            "unit_amount": 3990,
            "quantity": 12
        }],
    "interval": "yearly",
    "currency": "usd",
    "percent_off": 0
},
```

```json
// For the following subscription the MRR is : 359.1$
{
    "id": "sub-1",
    "status": "active",
    "items" : [
        {
            "id": "sub-1-item-1",
            "module": "awareness",
            "unit_amount": 399,
            "quantity": 100
        }],
    "interval": "monthly",
    "currency": "usd",
    "percent_off": 10
},
```
