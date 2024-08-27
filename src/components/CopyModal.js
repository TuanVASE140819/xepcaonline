import React from 'react';
import { Modal, Space, Table, Tag, Checkbox, Button } from 'antd';

const CopyModal = ({ isCopyModalVisible, setCopyModalVisible, copySourceDay, days, targetDays, setTargetDays, handleConfirmCopy }) => {
  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'day',
      key: 'day',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Chọn',
      dataIndex: 'select',
      key: 'select',
      render: (text, record) => (
        <Checkbox
          checked={targetDays.includes(record.day)}
          onChange={(e) => {
            if (e.target.checked) {
              setTargetDays([...targetDays, record.day]);
            } else {
              setTargetDays(targetDays.filter(d => d !== record.day));
            }
          }}
        />
      ),
    },
  ];

  const data = days.map((day, index) => ({
    key: index,
    day,
  }));

  return (
    <Modal
      title={`Sao chép từ ngày ${copySourceDay}`}
      visible={isCopyModalVisible}
      onCancel={() => setCopyModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setCopyModalVisible(false)}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleConfirmCopy}>
          Xác nhận
        </Button>,
      ]}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <p className="font-bold">Sao chép từ ngày</p>
          <p>{copySourceDay}</p>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Space>
    </Modal>
  );
};

export default CopyModal;