import { supabase } from '@/lib/supabase/client';
import { SellCarFormData } from '@/types/sellCar';
import { uploadCarMedia } from '@/lib/supabase/media';
import { FetchError } from './types';

export async function submitCarListing(data: SellCarFormData) {
  try {
    // 1. Insert car data
    const { data: carData, error: carError } = await supabase
      .from('user_cars')
      .insert({
        seller_name: data.name,
        pin_code: data.pinCode,
        brand: data.brand,
        model: data.model,
        year: data.year,
        price: data.price,
        mileage_range: data.mileage,
        previous_owners: data.previousOwners,
        fuel_type: data.fuelType,
        transmission: data.transmission,
        body_type: data.bodyType,
        exterior_color: data.exteriorColor,
        interior_color: data.interiorColor,
      })
      .select()
      .single();

    if (carError) {
      throw new FetchError(
        'Failed to create car listing',
        carError.code,
        carError.details,
        carError.hint
      );
    }

    // 2. Insert features
    if (data.features.length > 0) {
      const { error: featuresError } = await supabase
        .from('car_features')
        .insert(
          data.features.map(feature => ({
            car_id: carData.id,
            feature,
          }))
        );

      if (featuresError) {
        throw new FetchError(
          'Failed to add car features',
          featuresError.code,
          featuresError.details,
          featuresError.hint
        );
      }
    }

    // 3. Upload media
    const uploadPromises = [];

    // Upload images
    if (data.images.length > 0) {
      uploadPromises.push(
        uploadCarMedia({
          carId: carData.id,
          files: data.images,
          type: 'image'
        })
      );
    }

    // Upload video if exists
    if (data.video) {
      uploadPromises.push(
        uploadCarMedia({
          carId: carData.id,
          files: [data.video],
          type: 'video'
        })
      );
    }

    await Promise.all(uploadPromises);

    return { success: true, carId: carData.id };
  } catch (error) {
    console.error('Error submitting car listing:', error);
    
    if (error instanceof FetchError) {
      throw error;
    }
    
    throw new FetchError(
      'Failed to submit car listing',
      'SUBMIT_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
}