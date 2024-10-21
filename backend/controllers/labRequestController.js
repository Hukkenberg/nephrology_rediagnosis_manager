// controllers/labRequestController.js
const { LabRequest, Patient } = require('../models');

// Lấy danh sách yêu cầu xét nghiệm đang chờ xử lý
const getAllLabRequests = async (req, res) => {
    try {
        const labRequests = await LabRequest.findAll({
            where: { status: 'pending' }, // Chỉ lấy yêu cầu chưa hoàn tất
            include: [{ model: Patient, attributes: ['name', 'dob'] }],
        });
        res.json(labRequests);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách yêu cầu xét nghiệm' });
    }
};

// Cập nhật kết quả xét nghiệm và thay đổi trạng thái
const updateLabRequest = async (req, res) => {
    const { lab_info } = req.body;

    try {
        const labRequest = await LabRequest.findByPk(req.params.id);
        if (!labRequest) return res.status(404).json({ message: 'Không tìm thấy yêu cầu xét nghiệm' });

        await labRequest.update({ lab_info, status: 'completed' }); // Cập nhật thông tin và trạng thái
        res.json({ message: 'Cập nhật thông tin xét nghiệm thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật thông tin xét nghiệm' });
    }
};

module.exports = {
    getAllLabRequests,
    updateLabRequest,
};
