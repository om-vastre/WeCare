package com.wecare.wecare.DTO;

public class AppointmentListResponse {
    
    private Integer AId;
    private Integer PId;
    private Integer DId;
    private String Dname;
    private String Pname;
    private String Date;
    private String Time;
    private String Type;
    private String Status;
    
    public Integer getAId() {
        return AId;
    }
    public void setAId(Integer id) {
        AId = id;
    }
    public Integer getPId() {
        return PId;
    }
    public void setPId(Integer pId) {
        PId = pId;
    }
    public Integer getDId() {
        return DId;
    }
    public void setDId(Integer dId) {
        DId = dId;
    }
    public String getDname() {
        return Dname;
    }
    public void setDname(String dname) {
        Dname = dname;
    }
    public String getDate() {
        return Date;
    }
    public void setDate(String date) {
        Date = date;
    }
    public String getTime() {
        return Time;
    }
    public void setTime(String time) {
        Time = time;
    }
    public String getType() {
        return Type;
    }
    public void setType(String type) {
        Type = type;
    }
    public String getStatus() {
        return Status;
    }
    public void setStatus(String status) {
        Status = status;
    }
public String getPname() {
        return Pname;
    }
    public void setPname(String pname) {
        Pname = pname;
    }
    
}
