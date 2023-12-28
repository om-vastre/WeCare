// package com.wecare.wecare.Service;

// import java.util.Properties;

// // import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.JavaMailSenderImpl;
// import org.springframework.mail.SimpleMailMessage;
// // import org.springframework.mail.javamail.MimeMessageHelper;
// // import org.springframework.stereotype.Service;
// // import org.thymeleaf.TemplateEngine;
// // import org.thymeleaf.context.Context;

// import com.wecare.wecare.Entity.Prescription;

// // import jakarta.mail.internet.MimeMessage;

// // @Service
// public class EmailService {

//     // @Autowired
//     // private JavaMailSender mailSender;

//     // @Autowired
//     // private TemplateEngine templateEngine;

    // public JavaMailSender configureMailSender() {
    //     JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    //     mailSender.setHost("smtp.gmail.com");
    //     mailSender.setPort(587);
    //     mailSender.setUsername("helmetdetection4321@gmail.com");
    //     mailSender.setPassword("nvdbruucmwasponu");
    //     Properties props = mailSender.getJavaMailProperties();
    //     props.put("mail.transport.protocol", "smtp");
    //     props.put("mail.smtp.auth", "true");
    //     props.put("mail.smtp.starttls.enable", "true");
    //     // props.put("mail.debug", "true");

    //     return mailSender;
    // }

//     // public void sendPrescriptionEmail(Prescription prescription, String recipientEmail) {
//     //     JavaMailSender mailSender = configureMailSender();
//     //     MimeMessage message = mailSender.createMimeMessage();
        
//     //     try {
//     //         MimeMessageHelper helper = new MimeMessageHelper(message, true);
//     //         helper.setTo(recipientEmail);
//     //         helper.setSubject("Prescription Details");

//     //         Context context = new Context();
//     //         context.setVariable("prescription", prescription);

//     //         // String content = templateEngine.process("templates/prescription-template", context);
//     //         String content = generateEmailContent(context);
//     //         helper.setText(content, true);

//     //         mailSender.send(message);

//     //     } catch (Exception e) {
//     //         System.out.println("Email sending error : "+ e.getMessage());
//     //         e.printStackTrace();
//     //     }
//     // }

//     // private String generateEmailContent(Context context) {
//     //     String emailContent = "<!DOCTYPE html>\n" +
//     //                           "<html>\n" +
//     //                           "<head>\n" +
//     //                           "    <style>\n" +
//     //                           "        table {\n" +
//     //                           "            border-collapse: collapse;\n" +
//     //                           "            width: 100%;\n" +
//     //                           "        }\n" +
//     //                           "        th, td {\n" +
//     //                           "            border: 1px solid black;\n" +
//     //                           "            padding: 8px;\n" +
//     //                           "            text-align: left;\n" +
//     //                           "        }\n" +
//     //                           "    </style>\n" +
//     //                           "</head>\n" +
//     //                           "<body>\n" +
//     //                           "    <h2>Prescription Details</h2>\n" +
//     //                           "    <table>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <th>Parameter</th>\n" +
//     //                           "            <th>Value</th>\n" +
//     //                           "        </tr>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <td>Id</td>\n" +
//     //                           "            <td th:text=\"${prescription.id}\"></td>\n" +
//     //                           "        </tr>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <td>Bill Amount</td>\n" +
//     //                           "            <td th:text=\"${prescription.billAmount}\"></td>\n" +
//     //                           "        </tr>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <td>Test</td>\n" +
//     //                           "            <td th:text=\"${prescription.test}\"></td>\n" +
//     //                           "        </tr>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <td>Test Result</td>\n" +
//     //                           "            <td th:text=\"${prescription.testResult}\"></td>\n" +
//     //                           "        </tr>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <td>Prescription</td>\n" +
//     //                           "            <td th:text=\"${prescription.prescription}\"></td>\n" +
//     //                           "        </tr>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <td>Body Part Name</td>\n" +
//     //                           "            <td th:text=\"${prescription.bodyPartName}\"></td>\n" +
//     //                           "        </tr>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <td>XRay Image Link</td>\n" +
//     //                           "            <td th:text=\"${prescription.xRayImageLink}\"></td>\n" +
//     //                           "        </tr>\n" +
//     //                           "        <tr>\n" +
//     //                           "            <td>Surgery Time</td>\n" +
//     //                           "            <td th:text=\"${prescription.surgeryTime}\"></td>\n" +
//     //                           "        </tr>\n" +
//     //                           "    </table>\n" +
//     //                           "</body>\n" +
//     //                           "</html>";

    
//     //     return templateEngine.process(emailContent, context);
//     // }
    

        
//     // Method to generate the table of the prescription parameters
//     public void sendPrescriptionEmail(Prescription prescription) {
//         String msg = "";
//         msg += "Id: " + prescription.getId() + "\n";
//         msg += "BillAmount: " + prescription.getBillAmount() + "\n";
//         msg += "Test: " + prescription.getTest() + "\n";
//         msg += "TestResult: " + prescription.getTestResult() + "\n";
//         msg += "Prescription: " + prescription.getPrescription() + "\n";
//         msg += "BodyPartName: " + prescription.getBodyPartName() + "\n";
//         msg += "SurgeryTime: " + prescription.getSurgeryTime() + "\n";
//         msg += "XRayImageLink: " + prescription.getXRayImageLink() + "\n";

//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setTo(prescription.getAppointment().getPatient().getEmail());
//         message.setSubject("Your OTP Code");
//         message.setText("Your OTP code is: ");

//         JavaMailSender mailSender = configureMailSender();
//         mailSender.send(msg);
//         System.out.println("OTP sent successfully to " + prescription.getAppointment().getPatient().getEmail());

//     }
// }
