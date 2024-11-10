    import React, { useState } from 'react';
    import { InputText } from 'primereact/inputtext';
    import { Button } from 'primereact/button';
    import 'primereact/resources/themes/saga-blue/theme.css';
    import 'primereact/resources/primereact.min.css';
    import 'primeicons/primeicons.css';
    import { Card } from 'primereact/card';
    import 'src/styles/TripPlan/Destiny.scss'; // Import custom CSS
    import { useStateTogether } from 'react-together';
    import useHover from './HoveringUserList'; // Import the custom hook

    const Destiny: React.FC = () => {
        const [destination, setDestination] = useState('');
        const [submittedDestination, setSubmittedDestination] = useStateTogether<string>('destination', '');
        
        // Use the useHover hook for the card and button
        const { isHovered: isCardHovered, onMouseEnter: onCardMouseEnter, onMouseLeave: onCardMouseLeave } = useHover();
        const { isHovered: isButtonHovered, onMouseEnter: onButtonMouseEnter, onMouseLeave: onButtonMouseLeave } = useHover();

        const handleSubmit = () => {
            if (destination.trim()) {
                setSubmittedDestination(destination); // Atualiza o estado de destino enviado
            }
        };

        return (
            <Card
                title="Destination"
                className={`p-shadow-5 ${isCardHovered ? 'hovered-card' : ''}`} // Apply hover class conditionally
                style={{ marginBottom: '1rem' }}
                onMouseEnter={onCardMouseEnter} // Set hover event for the Card
                onMouseLeave={onCardMouseLeave}
            >
                <div className="destiny-container p-fluid">
                    {/* Campo de entrada para o destino */}
                    <div className="p-field destiny-field">
                        <label htmlFor="destination" className="p-d-block">Where to? &#9992; </label>
                        <InputText
                            id="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="p-inputtext-lg p-d-block"
                            placeholder="Enter your destination"
                        />
                    </div>
                    {/* Botão de envio */}
                    <div
                        className="destiny-button-container p-d-flex p-jc-center p-mt-3"
                        onMouseEnter={onButtonMouseEnter} // Set hover event for the Button
                        onMouseLeave={onButtonMouseLeave}
                    >
                        <Button
                            label="Submit"
                            onClick={handleSubmit}
                            className={`p-button-rounded p-button-primary ${isButtonHovered ? 'hovered-button' : ''}`} // Apply hover class conditionally
                        />
                    </div>

                    {/* Exibição do destino submetido */}
                    {submittedDestination && (
                        <div>
                            <h3>Your Destination:</h3>
                            <p>{submittedDestination}</p>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    export default Destiny;
