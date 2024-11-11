package com.backend.backend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    @ElementCollection
    @CollectionTable(name = "history_articles", joinColumns = @JoinColumn(name = "history_id"))
    @Column(name = "article_id")
    private List<UUID> articleIds;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date orderDate;

    @Column(nullable = false)
    private UUID orderId;

    private String orderStatus;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;
}