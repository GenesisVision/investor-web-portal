import snsWebSdk from "@sumsub/websdk";
import { api } from "services/api-client/swagger-custom-client";

/**
 * @param apiUrl - 'https://test-api.sumsub.com' (sandbox)
 or 'https://api.sumsub.com' (production)
 * @param flowName - the flow name chosen at Step 1 (e.g. 'basic-kyc')
 * @param accessToken - access token that you generated on the backend in Step 2
 * @param applicantEmail - applicant email (not required)
 * @param applicantPhone - applicant phone, if available (not required)
 * @param customI18nMessages - customized locale messages for current session (not required)
 */

export const launchWebSdk = params => {
  const {
    userId,
    apiUrl,
    flowName,
    accessToken,
    applicantEmail,
    applicantPhone,
    customI18nMessages
  } = params;
  let snsWebSdkInstance = snsWebSdk
    .Builder(apiUrl, flowName)
    .withAccessToken(accessToken, async newAccessTokenCallback => {
      // Access token expired
      // get a new one and pass it to the callback to re-initiate the WebSDK
      let newAccessToken = await api
        .profile()
        .getWebVerificationToken()
        .then(({ accessToken }) => accessToken); // get a new token from your backend
      newAccessTokenCallback(newAccessToken);
    })
    .withConf({
      userId,
      lang: "en",
      email: applicantEmail,
      phone: applicantPhone,
      i18n: customI18nMessages,
      onMessage: (type, payload) => {
        // see below what kind of messages the WebSDK generates
        console.log("WebSDK onMessage", type, payload);
      },
      clientId: "Genesis",
      excludedCountries: ["USA"],
      applicantDataPage: {
        enabled: true,
        fields: [
          {
            name: "firstName",
            required: true
          },
          {
            name: "lastName",
            required: true
          },
          {
            name: "email",
            required: true
          },
          {
            name: "phone",
            required: true
          },
          {
            name: "country",
            required: true
          }
        ]
      },
      requiredDocuments: "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE",
      uiConf: {
        customCss: "https://genesis.vision/assets/kyc/style.css?v=1"
        // URL to css file in case you need change it dynamically from the code
        // the similar setting at Applicant flow will rewrite customCss
        // you may also use to pass string with plain styles `customCssStr:`
      },
      onError: error => {
        console.error("WebSDK onError", error);
      }
    })
    .build();

  // you are ready to go:
  // just launch the WebSDK by providing the container element for it
  snsWebSdkInstance.launch("#sumsub-websdk-container");
};
