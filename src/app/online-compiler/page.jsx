"use client";

import React, { Suspense } from "react";
import Compiler from './../../components/Compiler'


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Compiler />
        </Suspense>
    );
}
