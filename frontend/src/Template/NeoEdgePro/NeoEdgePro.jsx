import React from "react";
import TemplateLayout from "../TemplateLayout";
import "./NeoEdgePro.css";
import ProfileImageUpload from "../../components/ProfileImageUpload";
import QRCodeBlock from "../../components/QRCodeBlock";

export default function NeoEdgePro() {
    return (
        <TemplateLayout
            templateId="NeoEdgePro"
            wrapperClass="neo-wrapper"
            resumeClass="neo-resume"
        >
            {({ canEdit, isEditable, pdfRef, requirePayment }) => (
                <div className="neo-wrapper">

                    {/* ✅ EVERYTHING INSIDE pdfRef */}
                    <div ref={pdfRef}>
                        {/* ================= PAGE 1 ================= */}
                        <div className="neo-a4">

                            <div className="neo-resume">

                                {/* HEADER */}
                                <header className="neo-header">

                                    <div className="neo-header-left">

                                        <div className="neo-profile-global">
                                            <div className="neo-profile-shape">

                                                <ProfileImageUpload
                                                    canEdit={canEdit}
                                                    isEditable={isEditable}
                                                    requirePayment={requirePayment}
                                                    className="neo-profile-wrapper"
                                                    imgClass="neo-profile"
                                                />

                                            </div>
                                        </div>

                                        <div className="neo-header-text">
                                            <h1 contentEditable={canEdit && isEditable}>
                                                ALEXANDER MORGAN
                                            </h1>
                                            <p contentEditable={canEdit && isEditable}>
                                                SENIOR SOFTWARE ENGINEER
                                            </p>
                                        </div>

                                    </div>

                                    <div className="neo-header-right">
                                        <QRCodeBlock
                                            canEdit={canEdit}
                                            isEditable={isEditable}
                                        />
                                    </div>

                                </header>

                                {/* BODY */}
                                <div className="neo-body">

                                    {/* SIDEBAR */}
                                    <aside className="neo-sidebar">

                                        <section className="neo-section">
                                            <h3 className="neo-section-title">CONTACT</h3>

                                            <ul className="neo-list">

                                                <li>
                                                    <span className="neo-icon">📞</span>
                                                    <span contentEditable={canEdit && isEditable}>
                                                        +1 (555) 245-8890
                                                    </span>
                                                </li>

                                                <li>
                                                    <span className="neo-icon">✉️</span>
                                                    <span contentEditable={canEdit && isEditable}>
                                                        alex.morgan@email.com
                                                    </span>
                                                </li>

                                                <li>
                                                    <span className="neo-icon">📍</span>
                                                    <span contentEditable={canEdit && isEditable}>
                                                        New York, USA
                                                    </span>
                                                </li>

                                                <li>
                                                    <span className="neo-icon">🌐</span>
                                                    <span contentEditable={canEdit && isEditable}>
                                                        www.alexmorgan.dev
                                                    </span>
                                                </li>

                                            </ul>
                                        </section>

                                    </aside>

                                    {/* MAIN */}
                                    <main className="neo-main">

                                        <section>
                                            <h2>SUMMARY</h2>
                                            <p>
                                                Results-driven software engineer with 6+ years of experience building scalable web applications and modern user interfaces.
                                            </p>
                                        </section>

                                    </main>

                                </div>

                            </div>

                        </div>

                        {/* ================= PAGE 2 ================= */}
                        <div className="neo-a4 neo-page-2">
                            <div style={{ paddingTop: "30px" }}>
                                <h2>PAGE 2 TEST</h2>
                                <p>This is second page</p>
                            </div>
                        </div>

                    </div>

                </div>

            )}
        </TemplateLayout>
    );
}