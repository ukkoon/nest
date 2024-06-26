/**
 * Errors
 */

import { CustomError } from 'src/interface/error';

export const failToAuthError: CustomError = {
  message: '인증에 실패했습니다.',
  code: 4000,
};

export const notAuthorizedError: CustomError = {
  message: '권한이 없습니다.',
  code: 4001,
};

export const alreadyRegisteredError: CustomError = {
  message: '이미 가입된 번호입니다.',
  code: 4002,
};

export const tokenExpiredError: CustomError = {
  message: '만료된 토큰입니다.',
  code: 4003,
};

export const notRegisteredError: CustomError = {
  message: '가입되지 않았습니다.',
  code: 4004,
};

export const invalidPhoneNumError: CustomError = {
  message: '올바르지 않은 휴대폰 번호입니다.',
  code: 4005,
};

export const notServiceCountryError: CustomError = {
  message: '서비스를 지원하지 않는 국가입니다.',
  code: 4006,
};

export const invalidTokenTypeError: CustomError = {
  message: '올바르지 않은 멤버 유형입니다.',
  code: 4007,
};

export const invalidTokenError: CustomError = {
  message: '토큰이 올바르지 않습니다.',
  code: 4008,
};

export const invalidOAuthAccessTokenError: CustomError = {
  message: 'OAuthAccessToken이 올바르지 않습니다.',
  code: 4009,
};

export const invalidGeocodeParamsError: CustomError = {
  message: '주소 혹은 위·경도값이 유효하지 않습니다.',
  code: 4010,
};

export const alreadyApplyError: CustomError = {
  message: '이미 해당 공고에 지원했습니다.',
  code: 4011,
};

export const alreadyReportedError: CustomError = {
  message: '이미 신고한 리뷰입니다.',
  code: 4012,
};

export const recentlyRepublishedError: CustomError = {
  message: '24시간내 게시 혹은 재게시된 공고입니다.',
  code: 4013,
};

export const virtualNumberNotAlignedError: CustomError = {
  message: '안심번호 할당에 실패했습니다.',
  code: 4014,
};

export const positionsFullError: CustomError = {
  message: '여석이 없습니다.',
  code: 4015
}