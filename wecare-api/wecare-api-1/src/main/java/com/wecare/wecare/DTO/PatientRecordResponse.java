package com.wecare.wecare.DTO;

public class PatientRecordResponse {

    private Integer preid;
    private String date;
    private String type;
    private String doctorName;
    private Integer billNo;
    private Integer billAmount;
    private String test;
    private String testResult;
    private String prescription;
    private String bodyPartName;
    private String xRayImageLink;
    private String surgeryTime;

    
    public Integer getPreid() {
        return preid;
    }
    public void setPreid(Integer preid) {
        this.preid = preid;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getDoctorName() {
        return doctorName;
    }
    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
    public Integer getBillNo() {
        return billNo;
    }
    public void setBillNo(Integer billNo) {
        this.billNo = billNo;
    }
    public Integer getBillAmount() {
        return billAmount;
    }
    public void setBillAmount(Integer billAmount) {
        this.billAmount = billAmount;
    }
    public String getTest() {
        return test;
    }
    public void setTest(String test) {
        this.test = test;
    }
    public String getTestResult() {
        return testResult;
    }
    public void setTestResult(String testResult) {
        this.testResult = testResult;
    }
    public String getPrescription() {
        return prescription;
    }
    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }
    public String getBodyPartName() {
        return bodyPartName;
    }
    public void setBodyPartName(String bodyPartName) {
        this.bodyPartName = bodyPartName;
    }
    public String getxRayImageLink() {
        return xRayImageLink;
    }
    public void setxRayImageLink(String xRayImageLink) {
        this.xRayImageLink = xRayImageLink;
    }
    public String getSurgeryTime() {
        return surgeryTime;
    }
    public void setSurgeryTime(String surgeryTime) {
        this.surgeryTime = surgeryTime;
    }


}
