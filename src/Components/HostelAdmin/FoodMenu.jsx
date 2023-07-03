import React, { useEffect, useState } from 'react';
import { FoodMenuApi, editFoodMenuApi } from '../../Services/hostelAdmin';
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const FoodMenuSchema = Yup.object().shape({
  breakfast: Yup.string().required('Breakfast is required'),
  lunch: Yup.string().required('Lunch is required'),
  snacks: Yup.string().required('Snacks is required'),
  dinner: Yup.string().required('Dinner is required'),
});

function FoodMenu() {
  const hostelId = useSelector((state) => state?.adminHostelData?.hostelId);
  const [foodData, setFoodData] = useState([
    {
      id: 1,
      day: 'Sunday',
      breakfast: 'Ittli, sambar',
      lunch: 'Chor, curry',
      snacks: 'Porikadi',
      dinner: 'Neichorum kozhikari',
    },
    {
      id: 2,
      day: 'Monday',
      breakfast: 'Ittli, sambar',
      lunch: 'Chor, curry',
      snacks: 'Porikadi',
      dinner: 'Neichorum kozhikari',
    },
    {
      id: 3,
      day: 'Tuesday',
      breakfast: 'Ittli, sambar',
      lunch: 'Chor, curry',
      snacks: 'Porikadi',
      dinner: 'Neichorum kozhikari',
    },
    {
      id: 4,
      day: 'Wednesday',
      breakfast: 'Ittli, sambar',
      lunch: 'Chor, curry',
      snacks: 'Porikadi',
      dinner: 'Neichorum kozhikari',
    },
    {
      id: 5,
      day: 'Thursday',
      breakfast: 'Ittli, sambar',
      lunch: 'Chor, curry',
      snacks: 'Porikadi',
      dinner: 'Neichorum kozhikari',
    },
    {
      id: 6,
      day: 'Friday',
      breakfast: 'Ittli, sambar',
      lunch: 'Chor, curry',
      snacks: 'Porikadi',
      dinner: 'Neichorum kozhikari',
    },
    {
      id: 7,
      day: 'Saturday',
      breakfast: 'Ittli, sambar',
      lunch: 'Chor, curry',
      snacks: 'Porikadi',
      dinner: 'Neichorum kozhikari',
    },
  
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const headers = {
          Authorization: JSON.parse(localStorage.getItem('HostelAdminToken')).token,
        };

        const response = await FoodMenuApi(headers);
        if (response) {
          setFoodData(response.data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoodData();
  }, []);

 
  const handleEditMenu = (menuData) => {
    setSelectedMenu(menuData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log(values, hostelId, 'handle submit values');
    try {
      const headers = {
        Authorization: JSON.parse(localStorage.getItem('HostelAdminToken')).token,
      };

      const day = selectedMenu ? selectedMenu.day : '';

      const updatedValues = {
        ...values,
        day: day,
      };

      await editFoodMenuApi(headers, updatedValues, hostelId)
        .then(() => {
          toast.success('Food Menu Updated successfully');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
    handleModalClose();
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <>
      <div>
        <h1 className="text-[#002D7A] font-bold text-3xl">Food Listing</h1>
      </div>
      <div>
        <table className="w-full bg-white rounded-lg overflow-hidden mt-5">
          <thead className="bg-[#4874BF]">
            <tr>
              <th className="p-3 text-white text-sm font-bold tracking-wide text-left">NO</th>
              <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Day</th>
              <th className="p-3 text-white text-sm font-bold tracking-wide text-left">BreakFast</th>
              <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Lunch</th>
              <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Snacks</th>
              <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Dinner</th>
              <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {foodData.map((menuData, index) => (
              <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} key={menuData.id}>
                <td className="p-3 text-gray-500 font-semibold">{menuData.id}</td>
                <td className="p-3 text-gray-500 font-semibold">{menuData.day}</td>
                <td className="p-3 text-gray-500 font-semibold">{menuData.breakfast}</td>
                <td className="p-3 text-gray-500 font-semibold">{menuData.lunch}</td>
                <td className="p-3 text-gray-500 font-semibold">{menuData.snacks}</td>
                <td className="p-3 text-gray-500 font-semibold">{menuData.dinner}</td>
                <td className="p-3 flex flex-col sm:flex-row">
                  <button className="btn btn-info" onClick={() => handleEditMenu(menuData)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title={selectedMenu ? `${selectedMenu.day}'s Menu` : 'Edit Menu'}
        visible={isModalOpen}
        onCancel={handleModalClose}
      >
        {selectedMenu && (
          <Formik
            initialValues={{
              day: selectedMenu ? selectedMenu.day : '',
              breakfast: selectedMenu.breakfast,
              lunch: selectedMenu.lunch,
              snacks: selectedMenu.snacks,
              dinner: selectedMenu.dinner,
            }}
            validationSchema={FoodMenuSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <h3 className="text-lg font-semibold mb-4">{selectedMenu.day}</h3>
                <div className="mb-4">
                  <label htmlFor="breakfast" className="block font-semibold mb-1">
                    Breakfast:
                  </label>
                  <Field
                    type="text"
                    id="breakfast"
                    name="breakfast"
                    className={`w-full px-3 py-2 border ${
                      errors.breakfast && touched.breakfast ? 'border-red-500' : 'border-gray-300'
                    } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <ErrorMessage name="breakfast" component="div" className="text-red-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="lunch" className="block font-semibold mb-1">
                    Lunch:
                  </label>
                  <Field
                    type="text"
                    id="lunch"
                    name="lunch"
                    className={`w-full px-3 py-2 border ${
                      errors.lunch && touched.lunch ? 'border-red-500' : 'border-gray-300'
                    } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <ErrorMessage name="lunch" component="div" className="text-red-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="snacks" className="block font-semibold mb-1">
                    Snacks:
                  </label>
                  <Field
                    type="text"
                    id="snacks"
                    name="snacks"
                    className={`w-full px-3 py-2 border ${
                      errors.snacks && touched.snacks ? 'border-red-500' : 'border-gray-300'
                    } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <ErrorMessage name="snacks" component="div" className="text-red-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="dinner" className="block font-semibold mb-1">
                    Dinner:
                  </label>
                  <Field
                    type="text"
                    id="dinner"
                    name="dinner"
                    className={`w-full px-3 py-2 border ${
                      errors.dinner && touched.dinner ? 'border-red-500' : 'border-gray-300'
                    } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <ErrorMessage name="dinner" component="div" className="text-red-500" />
                </div>
                <div className="flex justify-end">
                  <Button className='bg-blue-500 px-3 py-1 text-white' htmlType="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
    </>
  );
}

export default FoodMenu;
