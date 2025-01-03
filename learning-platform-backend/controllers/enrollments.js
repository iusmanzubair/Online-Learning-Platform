import db from "../database/db.js";

export const addEnrollment = async (req, res)=> {
 try {
    const { studentId, courseId } = req.body;

    if(!studentId || !courseId) {
        return res.status(400).json({
            success: false,
            message: "Unable to enroll"
        })
    }
    await db.query(`INSERT INTO Enrollments (studentId, courseId) VALUES (?, ?)`, [studentId, courseId]);
    
    res.status(200).json({
        success: true,
        message: "Successfully Enrolled"
    })
 } catch (error) {
    res.status(400).json({
        success: false,
        message: "Unable to enroll"
    })
 }
}

export const checkEnrollment = async (req, res)=> {
    try {
        const { studentId, courseId } = req.query;
       
        if(!studentId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Unable to check for enrollment"
            })
        } 

        const [enrollment] = await db.query(`SELECT * FROM Enrollments WHERE courseId=? AND studentId=?`, [courseId, studentId]);

        if(!enrollment || enrollment.length == 0) {
            return res.status(200).json({
                isEnrolled: false
            })
        }

        res.status(200).json({
            isEnrolled: true
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to check for enrollment"
        })
    }
}

export const deleteEnrollment = async (req, res)=> {
    try {
        const { studentId, courseId } = req.query;
        
        if(!studentId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Unable to delete enrollment"
            })
        } 

        const [enrollment] = await db.query(`SELECT * FROM Enrollments WHERE courseId=? AND studentId=?`, [courseId, studentId]);

        if(!enrollment || enrollment.length === 0) {
            return res.status(401).json({
                message: "User is not enrolled in particular course"
            })
        }

        await db.query(`DELETE FROM Enrollments WHERE courseId=? AND studentId=?`, [courseId, studentId]);
        res.status(200).json({
            success: true,
            message: "Enrollment deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete enrollment"
        })
    }
}