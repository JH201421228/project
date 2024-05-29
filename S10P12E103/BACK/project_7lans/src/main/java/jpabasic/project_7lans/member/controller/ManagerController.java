package jpabasic.project_7lans.member.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jpabasic.project_7lans.member.dto.child.ChildRequestDto;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.childCenter.service.ChildCenterService;
import jpabasic.project_7lans.member.service.ChildService;
import jpabasic.project_7lans.member.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="관리자 API", description = "관리자 관련 API입니다.")
@RestController
@RequestMapping(value = "/manager")
@RequiredArgsConstructor
public class ManagerController {

}
