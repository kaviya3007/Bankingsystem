package com.bankingsystem.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends GenericFilter {

    private final JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String header = req.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                String email = jwtUtil.extractEmail(token);
                if (email != null) {
                    org.springframework.security.authentication.UsernamePasswordAuthenticationToken auth =
                            new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(email, null, java.util.Collections.emptyList());
                    org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                // Invalid token, ignore and move on (Spring will handle access denied)
            }
        }

        chain.doFilter(request, response);
    }
}