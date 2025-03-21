import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    const { searchParams } = new URL(request.url);
    const storageKey = searchParams.get('storageKey');
    
    if (!storageKey) {
      return NextResponse.json(
        { error: 'Missing storageKey parameter' },
        { status: 400 }
      );
    }

    // Parse the storageKey to handle different user orders
    let alternativeKey = null;
    if (storageKey.includes('@') && storageKey.includes(',')) {
      const [basePart, usersPart] = storageKey.split('@');
      const users = usersPart.split(',');
      const sortedUsers = [...users].sort().join(',');
      alternativeKey = `${basePart}@${sortedUsers}`;
    }

    // Query for the objects with the specified storage key or its alternative
    let query = supabase
      .from('objects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
      
    // If we have an alternative key and it's different from the original
    if (alternativeKey && alternativeKey !== storageKey) {
      query = query.or(`storage_key.eq.${storageKey},storage_key.eq.${alternativeKey}`);
    } else {
      query = query.eq('storage_key', storageKey);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No data found for the provided storage key' },
        { status: 404 }
      );
    }

    // Parse the content back to an object
    const content = JSON.parse(data[0].content);
    
    return NextResponse.json({ 
      success: true, 
      data: content,
      metadata: {
        created_at: data[0].created_at,
        id: data[0].id
      }
    });
  } catch (error: any) {
    console.error('Error retrieving objects from Supabase:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    const { objList, storageKey } = await request.json();

    console.log('objList', objList, storageKey);
    if (!objList || !storageKey) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Normalize the storageKey by sorting the user list
    let normalizedStorageKey = storageKey;
    if (storageKey.includes('@') && storageKey.includes(',')) {
      const [basePart, usersPart] = storageKey.split('@');
      const users = usersPart.split(',');
      const sortedUsers = [...users].sort().join(',');
      normalizedStorageKey = `${basePart}@${sortedUsers}`;
    }

    // Insert the data as a row in the database
    const { data, error } = await supabase
      .from('objects')
      .insert([
        { 
          content: JSON.stringify(objList),
          storage_key: normalizedStorageKey,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving objects to Supabase:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
} 