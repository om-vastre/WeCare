package com.wecare.wecare.Entity;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.SimpleMailMessage;

import java.util.Properties;

public class EmailSender {

    public static String sendEmail(Prescription prescription) {
        JavaMailSender mailSender = configureMailSender();
        sendReceiptEmail(mailSender, prescription);
        return "Success";
    }

    private static JavaMailSender configureMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("mrcharlies.1201@gmail.com");
        mailSender.setPassword("jrxnymnddxicsopf");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        // props.put("mail.debug", "true");

        return mailSender;
    }

    private static void sendReceiptEmail(JavaMailSender mailSender, Prescription prescription) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(prescription.getAppointment().getPatient().getEmail());
        message.setSubject("Your WeCare Receipt");

        String msg = "";
        msg += "Id: " + prescription.getId() + "\n";
        msg += "BillAmount: " + prescription.getBillAmount() + "\n";

        if(!prescription.getTest().isEmpty()){
            msg += "Test: " + prescription.getTest() + "\n";
        }
        if(!prescription.getTestResult().isEmpty()){
            msg += "TestResult: " + prescription.getTestResult() + "\n";
        }
        if(!prescription.getPrescription().isEmpty()){
            msg += "Prescription: " + prescription.getPrescription() + "\n";
        }
        if(!prescription.getBodyPartName().isEmpty()){
            msg += "BodyPartName: " + prescription.getBodyPartName() + "\n";
        }
        if(!prescription.getSurgeryTime().isEmpty()){
            msg += "SurgeryTime: " + prescription.getSurgeryTime() + "\n";
        }
        if(!prescription.getXRayImageLink().isEmpty()){
            msg += "XRayImageLink: " + prescription.getXRayImageLink() + "\n";
        }

        message.setText(msg);
        mailSender.send(message);
        System.out.println("OTP sent successfully to " + prescription.getAppointment().getPatient().getEmail());
    }


}
