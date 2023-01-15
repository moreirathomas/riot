<p align="center">
  <img alt="Riot logo" width="120" src="https://uploads-ssl.webflow.com/6278dd61c2d8953dae931fbd/6278dd61c2d8956b07932038_logo-purple%25201-p-500.png" />
  <br>
  <br>
</p>

# Riot Backend-challenge

Hi there!

Since you got here, you're probably taking a part in our recruitment process for Back-end developer position, right?

We're super happy to hear that! Getting right to it — the main purpose of this test is to check out your backend and solving problems skills. We'd like to get to know your approach of solving the following problems:

- Understand specs requirements.
- Manipulate Data structure.
- Create a small API in Node.js.

Feel free to open an issue if you got any questions or suggestions! Once it's ready, send us a repository link at louis@tryriot.com.

Happy coding and cheers,

Louis, CTO @ Riot

## Table of Contents

- [Riot Backend-challenge](#riot-backend-challenge)
  - [Table of Contents](#table-of-contents)
    - [Exercise : MRR Compute Service](#exercise--mrr-compute-service)
      - [Problem](#problem)
      - [API](#api)
      - [Clarifications](#clarifications)
      - [Example](#example)

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
