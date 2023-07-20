import React, { useEffect, useState, useMemo } from 'react';
import { FoodMenuApi, addFoodmenuApi, editFoodMenuApi } from '../../../Services/hostelAdmin';
import { toast } from 'react-toastify';
import { Button, Modal, message } from 'antd';
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
  const [foodData, setFoodData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
  }), []); 
  
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
       
        const response = await FoodMenuApi(headers, hostelId);
        if (response) {
          setFoodData(response.data.foodData);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoodData();
  }, [headers,hostelId]);


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

  const showModalOption = () => {
    setModalOpen(true);
  };
  const handleOkButton = () => {
    setModalOpen(false);
  };
  const handleCancelButton = () => {
    setModalOpen(false);
  };


  const handleAddMenu = async (values) => {
    try {
      const response = await addFoodmenuApi(headers, values, hostelId);
      console.log(response, "<< checking responce");
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('New Food Menu added successfully');
      }
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error(error.message || 'An error occurred');
    }
  };

  return (
    <>
      <div className="flex justify-end  pb-2">
        <button className="btn btn-info" onClick={showModalOption}>
          Add Menu
        </button>
      </div>
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
            {foodData.length === 0 ? (
              <div className='text-2xl text-black '><h1>Not added food menu yet</h1></div>

            ) : (
              foodData.map((menuData, index) => (
                <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} key={menuData.id}>
                  <td className="p-3 text-gray-500 font-semibold">{index + 1}</td>
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
              ))
            )}
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
                    className={`w-full px-3 py-2 border ${errors.breakfast && touched.breakfast ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-3 py-2 border ${errors.lunch && touched.lunch ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-3 py-2 border ${errors.snacks && touched.snacks ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-3 py-2 border ${errors.dinner && touched.dinner ? 'border-red-500' : 'border-gray-300'
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


      <Modal title="Basic Modal" open={ModalOpen} onOk={handleOkButton} onCancel={handleCancelButton}>
        <Formik
          initialValues={{
            day: '',
            breakfast: '',
            lunch: '',
            snacks: '',
            dinner: '',
          }}
          validationSchema={FoodMenuSchema}
          onSubmit={handleAddMenu}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="day" className="block font-semibold mb-1">
                Day:
              </label>
              <Field
                as="select"
                name="day"
                className="w-full h-10 rounded-md bg-white text-black border border-black"
              >
                <option value="">Select a day...</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </Field>
              <ErrorMessage name="day" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="breakfast" className="block font-semibold mb-1">
                Breakfast:
              </label>
              <Field
                type="text"
                name="breakfast"
                className="w-full h-10 rounded-md bg-white text-black border border-black"
                placeholder="Enter breakfast menu here..."
              />
              <ErrorMessage name="breakfast" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="lunch" className="block font-semibold mb-1">
                Lunch:
              </label>
              <Field
                type="text"
                name="lunch"
                className="w-full h-10 rounded-md bg-white text-black border border-black"
                placeholder="Enter lunch menu here..."
              />
              <ErrorMessage name="lunch" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="snacks" className="block font-semibold mb-1">
                Snacks:
              </label>
              <Field
                type="text"
                name="snacks"
                className="w-full h-10 rounded-md bg-white text-black border border-black"
                placeholder="Enter snacks menu here..."
              />
              <ErrorMessage name="snacks" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="dinner" className="block font-semibold mb-1">
                Dinner:
              </label>
              <Field
                type="text"
                name="dinner"
                className="w-full h-10 rounded-md bg-white text-black border border-black"
                placeholder="Enter dinner menu here..."
              />
              <ErrorMessage name="dinner" component="div" className="text-red-500" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-500 px-3 py-1 text-white" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal>



    </>
  );
}

export default FoodMenu;
