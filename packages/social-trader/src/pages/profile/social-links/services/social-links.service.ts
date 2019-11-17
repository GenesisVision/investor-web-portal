import {
  CancelablePromise,
  SocialLinkViewModel,
  UpdateSocialLinkViewModel
} from "gv-api-web";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

export const fetchSocialLinks = (): CancelablePromise<
  SocialLinkViewModel[]
> => {
  const authorization = authService.getAuthArg();
  return profileApi
    .getSocialLinks(authorization)
    .then(({ socialLinks }) => socialLinks);
};

export const updateSocialLink = (requestData: UpdateSocialLinkViewModel) =>
  profileApi.updateSocialLinks(authService.getAuthArg(), {
    model: requestData
  });
