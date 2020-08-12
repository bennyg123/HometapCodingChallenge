import "unfetch/polyfill";

// API KEY Variable to be replaced during build
const APIKEY = "API_KEY";

// List of 50 States Abbreviations
export const STATES = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
];

// Simple 5 digit zip code validation for #####
const ZIP_REGEX = /\b\d{5}\b/gm;;
export const ZIP_VALIDATION = (value: string) => 
    (value.match(ZIP_REGEX)) ? {
        valid: true,
    }: {
        valid: false,
        message: "Please enter a valid zip code"
    }

// helper function access the api to validate zip code
export const validateZIPCode = async (zipcode: string, callback: (status: number) => void) => {
    const response = await fetch(`https://www.zipcodeapi.com/rest/${APIKEY}/info.json/${zipcode}/degrees`)
    callback(response.status);
}