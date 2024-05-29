package jpabasic.project_7lans.member.service;

import jpabasic.project_7lans.member.dto.member.MemberRequestDto;
import org.springframework.http.ResponseEntity;

public interface MemberService {

    // ===============================================================================
    // 회원가입

    // 아동 회원가입
    public void childRegister(MemberRequestDto.sign memberDto);

    // 봉사자 회원가입
    public void volunteerRegister(MemberRequestDto.sign memberDto);

    // 관리자 회원가입
    public void managerRegister(MemberRequestDto.sign memberDto);

    //===============================================================================
    //로그인
    public ResponseEntity<?> login(MemberRequestDto.login memberRegisterDto);

    // ===============================================================================
    // 조회


    // ===============================================================================
    // 수정
    public void changeProfileImg(MemberRequestDto.changeProfile profileReqDto);

    public void changePassword(MemberRequestDto.changePassword passwordReqDto);
    // ===============================================================================
    // 탈퇴

    public void deleteMember(MemberRequestDto.delete memberDto);

}
