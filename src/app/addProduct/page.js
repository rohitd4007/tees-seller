'use client';

import AddProductForm from "@/components/addProductComponent/addProductForm";
import NavBar from "@/components/navBarComponent/navBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProduct() {
    const [showForm, setShowForm] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return <>
        <NavBar />

        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
            {/* {isAdmin && ( */}
            {!showForm &&
                <button
                    style={{
                        padding: '1rem',
                        backgroundColor: 'darkseagreen',
                        outline: 'none',
                        border: 'none',
                        borderRadius: '1rem',
                        fontSize: '2rem',
                        color: '#000000'
                    }}
                    onClick={() => setShowForm(true)}>
                    Add Product
                </button>
            }
            {/* )} */}
            {showForm && <AddProductForm setShowForm={setShowForm} />}
        </div>
    </>;
}
