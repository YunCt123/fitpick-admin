import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Row, Col, Switch, Upload, message, Spin } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { mealService } from '../../services/meal.service';
import { ingredientService } from '../../services/ingredient.service';
import { filterService } from '../../services/filter.service';
import { apiUtils } from '../../api/axios';
import type { Meal } from '../../models/MealModel';
import type { ApiResponse } from '../../models/ApiResponse';

const { TextArea } = Input;
const { Option } = Select;

interface UpdateMealProps {
  meal: Meal | null;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateMeal: React.FC<UpdateMealProps> = ({ meal, visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Array<{ ingredientid: number; name: string }>>([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [dietTypes, setDietTypes] = useState<string[]>([]);
  const [loadingDietTypes, setLoadingDietTypes] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [statuses, setStatuses] = useState<Array<{ id: number; name: string }>>([]);
  const [loadingStatuses, setLoadingStatuses] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchIngredients();
      fetchDietTypes();
      fetchCategories();
      fetchStatuses();
      
      if (meal) {
        loadMealData();
      }
    }
  }, [visible, meal]);

  const loadMealData = async () => {
    if (!meal) return;
    
    try {
      setInitialLoading(true);
      
      // Get basic meal data from AdminMeal endpoint for IDs (categoryId, statusId)
      const basicMealResponse = await mealService.getMealById(meal.mealid);
      const basicMeal = basicMealResponse.data;
      
      // Get full meal detail from MealDetail endpoint for Instructions and Ingredients
      // The AdminMeal endpoint returns Meal entity with JsonIgnore on Mealingredients, 
      // so we need to use MealDetail endpoint to get ingredients and instructions
      const mealDetailResponse = await apiUtils.get<ApiResponse<any>>(`/api/MealDetail/${meal.mealid}`);
      const mealDetail = mealDetailResponse.data?.data || mealDetailResponse.data;
      
      // Pre-fill form with meal data
      // Use basicMeal for IDs and mealDetail for Instructions/Ingredients
      const formValues: any = {
        name: basicMeal.name || mealDetail?.name || mealDetail?.Name,
        description: basicMeal.description || mealDetail?.description || mealDetail?.Description || '',
        calories: basicMeal.calories || mealDetail?.calories || mealDetail?.Calories,
        cookingtime: basicMeal.cookingtime || mealDetail?.cookingtime || mealDetail?.Cookingtime,
        categoryId: basicMeal.categoryId || meal.categoryId, // Use from basicMeal or props
        diettype: basicMeal.diettype || mealDetail?.diettype || mealDetail?.Diettype,
        isPremium: basicMeal.isPremium !== undefined ? basicMeal.isPremium : (mealDetail?.isPremium !== undefined ? mealDetail.isPremium : mealDetail?.IsPremium || false),
        statusId: basicMeal.statusId || meal.statusId, // Use from basicMeal or props
        protein: basicMeal.protein || mealDetail?.protein || mealDetail?.Protein,
        carbs: basicMeal.carbs || mealDetail?.carbs || mealDetail?.Carbs,
        fat: basicMeal.fat || mealDetail?.fat || mealDetail?.Fat,
      };

      // MealDetailDto has Instructions as List<MealInstructionDto> with properties: MealId, StepNumber, Instruction
      // Backend is configured with JsonNamingPolicy.CamelCase, so "Instructions" becomes "instructions"
      // and "Instruction" becomes "instruction"
      let instructions: any[] = [];
      if (mealDetail?.instructions && Array.isArray(mealDetail.instructions) && mealDetail.instructions.length > 0) {
        instructions = mealDetail.instructions;
      } else if (mealDetail?.Instructions && Array.isArray(mealDetail.Instructions) && mealDetail.Instructions.length > 0) {
        instructions = mealDetail.Instructions;
      }
      
      if (instructions && instructions.length > 0) {
        // Instructions are already sorted by StepNumber from backend, but sort again to be safe
        formValues.instructions = instructions
          .sort((a: any, b: any) => {
            // Backend serializes as camelCase, so check stepNumber first
            const stepA = a.stepNumber || a.StepNumber || a.step_number || 0;
            const stepB = b.stepNumber || b.StepNumber || b.step_number || 0;
            return stepA - stepB;
          })
          .map((inst: any) => {
            // Backend serializes as camelCase, so check "instruction" first
            return inst.instruction || inst.Instruction || inst.instructionText || inst.InstructionText || inst.text || inst.Text || '';
          })
          .filter((inst: string) => inst && inst.trim().length > 0); // Filter out empty strings
      } else {
        formValues.instructions = [];
      }

      // MealDetailDto has Ingredients as List<MealIngredientDetailDto> with properties: IngredientId, IngredientName, Quantity, Unit
      let mealIngredients: any[] = [];
      if (mealDetail?.ingredients && Array.isArray(mealDetail.ingredients) && mealDetail.ingredients.length > 0) {
        mealIngredients = mealDetail.ingredients;
      } else if (mealDetail?.Ingredients && Array.isArray(mealDetail.Ingredients)) {
        mealIngredients = mealDetail.Ingredients;
      }
      
      if (mealIngredients.length > 0) {
        formValues.ingredients = mealIngredients.map((ing: any) => {
          // MealIngredientDetailDto has: IngredientId, Quantity
          const ingredientId = ing.ingredientId || ing.IngredientId || ing.ingredientid || ing.Ingredientid;
          const quantity = ing.quantity || ing.Quantity;
          
          return {
            ingredientId: ingredientId ? Number(ingredientId) : null,
            quantity: quantity ? Number(quantity) : 0
          };
        }).filter((ing: any) => ing.ingredientId && ing.quantity > 0);
      } else {
        formValues.ingredients = [];
      }

      // Pre-fill image if exists
      const imageUrl = basicMeal.imageUrl || mealDetail?.imageUrl || mealDetail?.ImageUrl;
      if (imageUrl) {
        formValues.image = [{
          uid: '-1',
          name: 'current-image.jpg',
          status: 'done',
          url: imageUrl
        }];
      }

      form.setFieldsValue(formValues);
    } catch (error) {
      console.error('Error loading meal data:', error);
      toast.error('Failed to load meal data');
    } finally {
      setInitialLoading(false);
    }
  };

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
        const dietTypeNames = response.data.data.map((item: any) => item.name || item.vietnameseName || item).filter(Boolean);
        setDietTypes(dietTypeNames);
      }
    } catch (error) {
      console.error('Error fetching diet types:', error);
      setDietTypes(['Non-Vegetarian', 'Vegetarian', 'Vegan']);
    } finally {
      setLoadingDietTypes(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await filterService.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to hardcoded categories
      setCategories([
        { id: 1, name: 'Breakfast' },
        { id: 2, name: 'Lunch' },
        { id: 3, name: 'Dinner' },
        { id: 4, name: 'Snacks' },
        { id: 5, name: 'Drinks' }
      ]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchStatuses = async () => {
    try {
      setLoadingStatuses(true);
      const response = await filterService.getMealStatuses();
      if (response.success && response.data) {
        setStatuses(response.data);
      }
    } catch (error) {
      console.error('Error fetching meal statuses:', error);
      setStatuses([{ id: 1, name: 'Active' }, { id: 2, name: 'Inactive' }]);
    } finally {
      setLoadingStatuses(false);
    }
  };

  const handleSubmit = async (values: any) => {
    if (!meal) return;

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
      if (values.statusId !== undefined && values.statusId !== null) {
        mealData.StatusId = Number(values.statusId);
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

      const response = await mealService.updateMeal(meal.mealid, mealData);
      
      if (response.success && response.data) {
        // Upload image if provided (new file, not existing URL)
        if (values.image && Array.isArray(values.image) && values.image.length > 0) {
          const fileItem = values.image[0];
          // Check if it's a new file (has originFileObj) or existing (has url but no originFileObj)
          const file = fileItem?.originFileObj || (fileItem?.url ? null : fileItem);
          if (file && file instanceof File) {
            try {
              await mealService.uploadMealImage(meal.mealid, file);
            } catch (imageError) {
              console.error('Error uploading image:', imageError);
              toast.warning('Meal updated but image upload failed');
            }
          }
        }
        
        toast.success('Meal updated successfully!');
        form.resetFields();
        onSuccess();
        onClose();
      } else {
        toast.error(response.message || 'Failed to update meal');
      }
    } catch (error: any) {
      console.error('Error updating meal:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to update meal';
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
        <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', color: '#faad14' }}>
          Update Meal: {meal?.name}
        </div>
      }
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      {initialLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>Loading meal data...</div>
        </div>
      ) : (
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
                <Select placeholder="Select category" size="large" loading={loadingCategories}>
                  {categories.map((cat) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
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

          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="isPremium"
                label="Premium Meal"
                valuePropName="checked"
              >
                <div style={{ marginTop: '8px' }}>
                  <Switch 
                    checkedChildren="Premium" 
                    unCheckedChildren="Regular"
                  />
                  <div style={{ marginTop: '4px', color: '#666', fontSize: '12px' }}>
                    Premium meals require subscription
                  </div>
                </div>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="statusId"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status" size="large" loading={loadingStatuses}>
                  {statuses.map((status) => (
                    <Option key={status.id} value={status.id}>
                      {status.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

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
                  Update Meal
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default UpdateMeal;
