import React, { useCallback, useEffect, useState } from 'react';
import Layout from './Layout';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const addProductHandler = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await axios.post('/apis/products', {
          name,
          price,
          image_url: imageUrl,
          description,
          category_id: selectedCategories,
        });

        navigate('/dashboard');
      } catch (error) {
        console.log(error);
      }
    },
    [description, imageUrl, name, navigate, price, selectedCategories]
  );

  // get categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios('/apis/categories');
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  // set first category as default cat
  useEffect(() => {
    if (categories[0]) {
      setSelectedCategories(categories[0].cat_id);
    }
  }, [categories]);

  return (
    <Layout>
      <h1 className="mb-1">Add Product</h1>
      <Card>
        <form onSubmit={addProductHandler}>
          <fieldset>
            <div className="mb-1">
              <label htmlFor="">Product Name</label>
              <Input placeholder="Product Name" value={name} update={setName} />
            </div>
            <div className="mb-1">
              <label htmlFor="">Image_url</label>
              <Input
                placeholder="Image_url"
                value={imageUrl}
                update={setImageUrl}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="">Price</label>
              <Input
                placeholder="Price"
                type="number"
                value={price}
                update={setPrice}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="">Description</label>
              <div>
                <textarea
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <div className="mb-1">
              <label htmlFor="">Category: </label>
              <select
                onChange={(e) => setSelectedCategories(e.target.value)}
                defaultValue={selectedCategories}
              >
                {categories.map(({ cat_id, name }, index) => {
                  return (
                    <option key={cat_id} value={cat_id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <Button type="submit">Add Product</Button>
            </div>
          </fieldset>
        </form>
      </Card>
    </Layout>
  );
};

export default AddProduct;
