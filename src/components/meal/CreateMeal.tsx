import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Row, Col, Upload, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { mealService } from '../../services/meal.service';
import { ingredientService } from '../../services/ingredient.service';
import { apiUtils } from '../../api/axios';
import type { ApiResponse } from '../../models/ApiResponse';

const { TextArea } = Input;
const { Option } = Select;

interface CreateMealProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateMeal: React.FC<CreateMealProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Array<{ ingredientid: number; name: string }>>([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [dietTypes, setDietTypes] = useState<string[]>([]);
  const [loadingDietTypes, setLoadingDietTypes] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchIngredients();
      fetchDietTypes();
    }
  }, [visible]);

  const fetchIngredients = async () => {
    try {
      setLoadingIngredients(true);
      const response = await ingredientService.getAllIngredients();
      if (response.success && response.data) {
        setIngredients(response.data);
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    } finally {
      setLoadingIngredients(false);
    }
  };

  const fetchDietTypes = async () => {
    try {
      setLoadingDietTypes(true);
      const response = await apiUtils.get<ApiResponse<any[]>>('/api/filter/diet-types');
      if (response.data.success && response.data.data) {
        // Extract diet type names from the response
        const dietTypeNames = response.data.data.map((item: any) => item.name || item.vietnameseName || item).filter(Boolean);
        setDietTypes(dietTypeNames);
      }
    } catch (error) {
      console.error('Error fetching diet types:', error);
      // Fallback to default values if API fails
      setDietTypes(['Non-Vegetarian', 'Vegetarian', 'Vegan']);
    } finally {
      setLoadingDietTypes(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      
      // Map to backend API format (PascalCase)
      const mealData: any = {
        Name: values.name.trim(),
        CategoryId: values.categoryId,
      };

      // Optional fields
      if (values.description) {
        mealData.Description = values.description.trim();
      }
      if (values.calories !== undefined && values.calories !== null) {
        mealData.Calories = Number(values.calories);
      }
      if (values.cookingtime !== undefined && values.cookingtime !== null) {
        mealData.Cookingtime = Number(values.cookingtime);
      }
      if (values.diettype) {
        mealData.Diettype = values.diettype;
      }
      if (values.protein !== undefined && values.protein !== null) {
        mealData.Protein = Number(values.protein);
      }
      if (values.carbs !== undefined && values.carbs !== null) {
        mealData.Carbs = Number(values.carbs);
      }
      if (values.fat !== undefined && values.fat !== null) {
        mealData.Fat = Number(values.fat);
      }
      
      // Instructions (array of strings)
      if (values.instructions && Array.isArray(values.instructions) && values.instructions.length > 0) {
        mealData.Instructions = values.instructions
          .map((inst: string) => inst.trim())
          .filter((inst: string) => inst.length > 0);
      }

      // Ingredients (array of { IngredientId, Quantity })
      if (values.ingredients && Array.isArray(values.ingredients) && values.ingredients.length > 0) {
        mealData.Ingredients = values.ingredients
          .filter((ing: any) => ing.ingredientId && ing.quantity)
          .map((ing: any) => ({
            IngredientId: Number(ing.ingredientId),
            Quantity: Number(ing.quantity)
          }));
      }

      console.log('Creating meal with data:', mealData);
      
      const response = await mealService.createMeal(mealData);
      
      if (response.success && response.data) {
        // Upload image if provided
        if (values.image && Array.isArray(values.image) && values.image.length > 0) {
          const file = values.image[0]?.originFileObj || values.image[0];
          if (file) {
            try {
              await mealService.uploadMealImage(response.data.mealid, file);
            } catch (imageError) {
              console.error('Error uploading image:', imageError);
              toast.warning('Meal created but image upload failed');
            }
          }
        }
        
        toast.success('Meal created successfully!');
        form.resetFields();
        onSuccess();
        onClose();
      } else {
        toast.error(response.message || 'Failed to create meal');
      }
    } catch (error: any) {
      console.error('Error creating meal:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to create meal';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', color: '#1890ff' }}>
          Create New Meal
        </div>
      }
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        style={{ marginTop: '20px' }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="Meal Name"
              rules={[
                { required: true, message: 'Please enter meal name' },
                { min: 2, message: 'Name must be at least 2 characters' },
                { max: 100, message: 'Name must not exceed 100 characters' }
              ]}
            >
              <Input 
                placeholder="Enter meal name"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder="Select category" size="large">
                <Option value={1}>Breakfast</Option>
                <Option value={2}>Lunch</Option>
                <Option value={3}>Dinner</Option>
                <Option value={4}>Snacks</Option>
                <Option value={5}>Drinks</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter meal description' },
            { min: 10, message: 'Description must be at least 10 characters' },
            { max: 500, message: 'Description must not exceed 500 characters' }
          ]}
        >
          <TextArea 
            rows={3}
            placeholder="Enter meal description"
            size="large"
          />
        </Form.Item>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="calories"
              label="Calories"
              rules={[
                { required: true, message: 'Please enter calories' },
                { type: 'number', min: 1, message: 'Calories must be greater than 0' },
                { type: 'number', max: 5000, message: 'Calories must not exceed 5000' }
              ]}
            >
              <InputNumber 
                placeholder="Enter calories"
                size="large"
                style={{ width: '100%' }}
                min={1}
                max={5000}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              name="cookingtime"
              label="Cooking Time (minutes)"
              rules={[
                { required: true, message: 'Please enter cooking time' },
                { type: 'number', min: 1, message: 'Cooking time must be greater than 0' },
                { type: 'number', max: 480, message: 'Cooking time must not exceed 480 minutes' }
              ]}
            >
              <InputNumber 
                placeholder="Enter cooking time"
                size="large"
                style={{ width: '100%' }}
                min={1}
                max={480}
              />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="diettype"
              label="Diet Type"
              rules={[{ required: true, message: 'Please select diet type' }]}
            >
              <Select 
                placeholder="Select diet type" 
                size="large"
                loading={loadingDietTypes}
                showSearch
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {dietTypes.length > 0 ? (
                  dietTypes.map((dietType) => (
                    <Option key={dietType} value={dietType}>
                      {dietType}
                    </Option>
                  ))
                ) : (
                  <>
                    <Option value="Non-Vegetarian">Non-Vegetarian</Option>
                    <Option value="Vegetarian">Vegetarian</Option>
                    <Option value="Vegan">Vegan</Option>
                  </>
                )}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="image"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                name="file"
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    message.error('You can only upload image files!');
                    return Upload.LIST_IGNORE;
                  }
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('Image must be smaller than 5MB!');
                    return Upload.LIST_IGNORE;
                  }
                  // Return false to prevent auto upload
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />} size="large" style={{ width: '100%' }}>
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="protein"
              label="Protein (g)"
              rules={[
                { type: 'number', min: 0, message: 'Protein must be greater than or equal to 0' },
                { type: 'number', max: 1000, message: 'Protein must not exceed 1000g' }
              ]}
            >
              <InputNumber 
                placeholder="Enter protein"
                size="large"
                style={{ width: '100%' }}
                min={0}
                max={1000}
                step={0.1}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              name="carbs"
              label="Carbs (g)"
              rules={[
                { type: 'number', min: 0, message: 'Carbs must be greater than or equal to 0' },
                { type: 'number', max: 1000, message: 'Carbs must not exceed 1000g' }
              ]}
            >
              <InputNumber 
                placeholder="Enter carbs"
                size="large"
                style={{ width: '100%' }}
                min={0}
                max={1000}
                step={0.1}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              name="fat"
              label="Fat (g)"
              rules={[
                { type: 'number', min: 0, message: 'Fat must be greater than or equal to 0' },
                { type: 'number', max: 1000, message: 'Fat must not exceed 1000g' }
              ]}
            >
              <InputNumber 
                placeholder="Enter fat"
                size="large"
                style={{ width: '100%' }}
                min={0}
                max={1000}
                step={0.1}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Cooking Instructions"
          name="instructions"
        >
          <Form.List name="instructions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={8} style={{ marginBottom: 8 }}>
                    <Col flex="auto">
                      <Form.Item
                        {...restField}
                        name={[name]}
                        rules={[{ required: true, message: 'Please enter instruction step' }]}
                      >
                        <Input placeholder={`Step ${name + 1}`} size="large" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        danger
                        size="large"
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    size="large"
                  >
                    Add Instruction Step
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item
          label="Ingredients"
          name="ingredients"
        >
          <Form.List name="ingredients">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={8} style={{ marginBottom: 8 }}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'ingredientId']}
                        rules={[{ required: true, message: 'Please select ingredient' }]}
                      >
                        <Select
                          placeholder="Select ingredient"
                          size="large"
                          loading={loadingIngredients}
                          showSearch
                          filterOption={(input, option) =>
                            (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                          }
                        >
                          {ingredients.map((ing) => (
                            <Option key={ing.ingredientid} value={ing.ingredientid}>
                              {ing.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        rules={[
                          { required: true, message: 'Enter quantity' },
                          { type: 'number', min: 0.01, message: 'Quantity must be greater than 0' }
                        ]}
                      >
                        <InputNumber
                          placeholder="Quantity"
                          size="large"
                          style={{ width: '100%' }}
                          min={0.01}
                          step={0.1}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        danger
                        size="large"
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    size="large"
                  >
                    Add Ingredient
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
          <Row justify="end" gutter={[8, 0]}>
            <Col>
              <Button 
                onClick={handleClose}
                size="large"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
              >
                Create Meal
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMeal;