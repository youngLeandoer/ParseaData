package com.diploma.model;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "imported_data")
public class ImportedData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "column1")
    private String column1;

    @Column(name = "column2")
    private String column2;

    @Column(name = "column3")
    private Integer column3;

    @Column(name = "column4")
    private Date column4;

    // Геттеры и сеттеры

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColumn1() {
        return column1;
    }

    public void setColumn1(String column1) {
        this.column1 = column1;
    }

    public String getColumn2() {
        return column2;
    }

    public void setColumn2(String column2) {
        this.column2 = column2;
    }

    public Integer getColumn3() {
        return column3;
    }

    public void setColumn3(Integer column3) {
        this.column3 = column3;
    }

    public Date getColumn4() {
        return column4;
    }

    public void setColumn4(Date column4) {
        this.column4 = column4;
    }
}
