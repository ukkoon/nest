import { HttpException, HttpStatus } from '@nestjs/common';
import { fetch } from 'cross-fetch';
import { invalidOAuthAccessTokenError } from 'src/others/custom_errors';

export function isValidPhoneNum(phoneNum: string) {
    // 길이가 10 이상인지 확인
    if (phoneNum.length < 10) {
        return false;
    }

    // 숫자만 포함되어 있는지 확인
    if (!/^\d+$/.test(phoneNum)) {
        return false;
    }

    // 모든 조건을 만족하면 유효한 전화번호로 간주
    return true;
}

export function generateAuthCode(): string {
    const min = Math.ceil(100000);
    const max = Math.floor(999999);
    return (Math.floor(Math.random() * (max - min)) + min).toString();
}