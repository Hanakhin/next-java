package com.backend.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // Activez la prise en charge de CORS
                .and()
                .csrf().disable() // Désactivez CSRF pour les API REST (à utiliser avec précaution)
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/api/auth/login", "/api/auth/register","/api/*").permitAll() // Autoriser l'accès aux endpoints d'authentification
                        .anyRequest().authenticated() // Exiger une authentification pour toutes les autres requêtes
                );
        return http.build();
    }
}