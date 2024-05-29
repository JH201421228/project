package jpabasic.project_7lans.security;

import jpabasic.project_7lans.member.entity.Member;
import jpabasic.project_7lans.member.entity.MemberType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final CorsConfig corsConfig;
    private final AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // UTF-8 인코딩
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);

        http
                // csrf 설정
                // Single Page Application 의 경우 기능을 사용하지 않아도 됨.
                .csrf(csrf -> csrf.disable())
                // 예외 설정
                 .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                // 세션 설정
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 인가 설정
                .authorizeHttpRequests(
                        (authorizeRequests) -> {
                            // 디테일한 내용이 반드시 위로 올라와야 한다.

                            // 아동이 로그인한 경우 권한

                            // 봉사자가 로그인한 경우 권한
                            authorizeRequests.requestMatchers("/meetingSchedue/delete/{meetingId}").hasAuthority(MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/meetingSchedue/create").hasAuthority(MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/meetingSchedue/open").hasAuthority(MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/meetingSchedue/close").hasAuthority(MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/activityLog/volunteer/**").hasAuthority(MemberType.VOLUNTEER.name());

                            // 관리자가 로그인한 경우 권한
                            authorizeRequests.requestMatchers("/childCenter/register").hasAuthority(MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/activityLog/manager/**").hasAuthority(MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/relation/create").hasAuthority(MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/relation/delete").hasAuthority(MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/child/content").hasAuthority(MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/child/centerAndVolunteerNoRelation").hasAuthority(MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/child/listByCenter/{centerId}").hasAuthority(MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/volunteer/listByCenter/{centerId}").hasAuthority(MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/volunteer/searchByName").hasAuthority(MemberType.MANAGER.name());

                            // 아동 & 봉사자
                            authorizeRequests.requestMatchers("/meetingImage/**").hasAnyAuthority(MemberType.CHILD.name(), MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/whisper/**").hasAnyAuthority(MemberType.CHILD.name(), MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/member/profile").hasAnyAuthority(MemberType.CHILD.name(), MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/dinosaurs/**").hasAnyAuthority(MemberType.CHILD.name(), MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/meetingSchedue/**").hasAnyAuthority(MemberType.CHILD.name(), MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/egg/**").hasAnyAuthority(MemberType.CHILD.name(), MemberType.VOLUNTEER.name());

                            // 봉사자 & 관리자
                            authorizeRequests.requestMatchers("/activityLog/**").hasAnyAuthority(MemberType.VOLUNTEER.name(), MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/child/{childId}").hasAnyAuthority(MemberType.VOLUNTEER.name(), MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/volunteer/time/{volunteerId}").hasAnyAuthority(MemberType.VOLUNTEER.name(), MemberType.MANAGER.name());

                            // 아동 & 관리자
                            authorizeRequests.requestMatchers("/volunteer/listByChild/{childId}").hasAnyAuthority(MemberType.CHILD.name(), MemberType.MANAGER.name());

                            // 전체 공통
                            authorizeRequests.requestMatchers("/childCenter/list").permitAll();
                            authorizeRequests.requestMatchers("/member/register").permitAll();
                            authorizeRequests.requestMatchers("/member/login").permitAll();
                            authorizeRequests.requestMatchers("/member/logout").hasAnyAuthority(MemberType.CHILD.name(), MemberType.VOLUNTEER.name(), MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/member/password").hasAnyAuthority(MemberType.CHILD.name(), MemberType.VOLUNTEER.name(), MemberType.MANAGER.name());
                            authorizeRequests.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**").permitAll();


                            // hasRole는 SpringSecurity 가 자동으로 가장 앞에 Role_를 붙인다. 따라서 hasAuthority를 쓰는 것이 낫다.
                            // authorizeRequests.requestMatchers("/vol/**").hasRole(MemberType.VOLUNTEER.name());
                            // authorizeRequests.requestMatchers("/vol/**").hasAuthority(MemberType.VOLUNTEER.name());
                            authorizeRequests.anyRequest().permitAll();
                        }
                );

        http.authenticationProvider(authenticationProvider);

        http.addFilter(corsConfig.corsFilter()); // cors 필터 적용

        // Security는 Dispatcher Servlet보다 먼저 동작하기 때문에 CSRF 필터 보다 Encoding 필터가 먼저 동작하도록 설정.
        http.addFilterBefore(characterEncodingFilter, CsrfFilter.class);
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
